import express,{Request,Response} from 'express'
import Hotel, { HotelType } from "../models/hotel";
import {param,validationResult} from 'express-validator'
import Stripe from 'stripe'
import verifytoken from '../middleware/auth';
import { BookingType } from '../types';
export type paymentIntentType={
  paymentIntentId:string;
  clientSecret:string;
  totalCost:number
};
const router=express.Router();


const stripe= new Stripe(process.env.STRIPE_API_KEY as string);



export type HotelSearchData ={
    data:HotelType[];
    pagination:{
        total:number;
        page:number;
        pages:number;
    }
}



router.get('/search',async(req:Request,res:Response)=>{
    try{
        const query = constructSearchQuery(req.query);
        let sortOptions={};
        switch(req.query.sortOption){
          case "starRating":
            sortOptions={starRating:-1}
            break
          case "pricePerNightAsc":
            sortOptions={pricePerNight:1}
            break
          case "pricePerNightDesc":
            sortOptions={pricePerNight:-1}
            break
        }
        const reqSize=5;
        const pageNumber=parseInt(req.query.page?req.query.page.toString():"1");
        const skip=(pageNumber-1)*reqSize;
        
        const hotels=await Hotel.find(query).sort(sortOptions).skip(skip).limit(reqSize);
        const totalHotels=await Hotel.countDocuments(query);
        const pages=Math.ceil(totalHotels/reqSize);
        const searchedData:HotelSearchData={
          data:hotels,
          pagination:{
            total:totalHotels,
            page:pageNumber,
            pages:pages,
          }
        }

        res.json(searchedData);

      }catch(e){
        console.log("error",e);
        res.status(400).json({message:"Something went wrong"});
      }
    })



router.post('/:hotelId/bookings/payment-intent',verifytoken,async(req:Request,res:Response)=>{
  let {noofNights}=req.body;
  const hotelId=req.params.hotelId;
  const hotel=await Hotel.findById(hotelId);
  if(!hotel){
    return res.status(400).json({message:"Hotel not found"})
  }
  if(noofNights===0){
    noofNights=1;
  }
  // const noofNits=Math.max(noofNights,1);
  const totalCost=hotel.pricePerNight*noofNights;
  // const customer = await stripe.customers.create({
  //   name: 'Jenny Rosen',
  //   email: 'jennyrosen@example.com',
  //   address:{
  //     city:"Delhi",
  //     country:"India",
  //     line1:"1212121",
  //     postal_code:"213121",
  //     state:"dlehi"
  //   }
  // });
  // console.log(totalCost,noofNights)
  const paymentIntents=await stripe.paymentIntents.create({
    amount:totalCost*100,
    currency:"inr",
    description:"Payment Intent for booking the hotel",
    metadata:{
      hotelId,
      userId:req.userId
    }
  })
  if(!paymentIntents.client_secret){
    return res.status(500).json({message:"Error creating payment intent with stripe"})
  }

  const response={
    paymentIntentId:paymentIntents.id,
    clientSecret:paymentIntents.client_secret.toString(),
    totalCost
  }


  res.send(response)



})

router.post('/:hotelId/bookings',verifytoken,async(req:Request,res:Response)=>{
  try{
    const paymentIntentId=req.body.paymentIntentId;
    const hotelId=req.params.hotelId;
    const paymentIntent=await stripe.paymentIntents.retrieve(paymentIntentId as string)
    if(!paymentIntent){
      return res.status(400).json({message:"Payment intent not found"});
    }

    if(paymentIntent.metadata.userId!==req.userId || paymentIntent.metadata.hotelId!==hotelId){
      return res.status(400).json({message:"Payment intent mismatch"})
    }

    if(paymentIntent.status!=="succeeded"){
      return res.status(400).json({message:`Payment intent not succeded , Status: ${paymentIntent.status}`})
    }

    const newBooking:BookingType={...req.body,userId:req.userId};

    const hotel=await Hotel.findOneAndUpdate({_id:hotelId},{$push:{bookings:newBooking}});

    if(!hotel)
    {
      return res.status(400).json({message:"Hotel not found"})
    }

    await hotel.save(); //hotel has saved the new booking


    return res.status(200).json({message:"Booking save success"});
    


  }catch(e){
    console.log(e);
    return res.status(400).json({message:"Error adding booking"})
  }
})

router.get('/',async(req:Request,res:Response)=>{
  try{
    const hotels=await Hotel.find().sort("-lastUpdated");
    res.json(hotels); 
  }catch(e){
    console.log(e);
    return res.status(500).send({message:"Something went wrong"})

  }

})

router.get('/:id',[param('id').notEmpty().withMessage('Hotel Id is required')],async(req:Request,res:Response)=>{
  const verr=validationResult(req);
  if(verr.array().length){
    return res.status(403).json({errors:verr.array()})
  }
  try{
    const id=req.params.id.toString();
    const hotel=await Hotel.findById(id);
    res.json(hotel);
  }catch(error){
    console.log(error)
    res.status(501).json({message:"Error fetching data"});
  }
})
  const constructSearchQuery = (queryParams: any) => {
    let constructedQuery: any = {};
  
    if (queryParams.destination) {
      constructedQuery.$or = [
        { city: new RegExp(queryParams.destination, "i") },
        { country: new RegExp(queryParams.destination, "i") },
      ];
    }
  
    if (queryParams.adultCount) {
      constructedQuery.adultCount = {
        $gte: parseInt(queryParams.adultCount),
      };
    }
  
    if (queryParams.childCount) {
      constructedQuery.childCount = {
        $gte: parseInt(queryParams.childCount),
      };
    }
  
    if (queryParams.facilities) {
      constructedQuery.facilities = {
        $all: Array.isArray(queryParams.facilities)
          ? queryParams.facilities
          : [queryParams.facilities],
      };
    }
  
    if (queryParams.types) {
      constructedQuery.type = {
        $in: Array.isArray(queryParams.types)
          ? queryParams.types
          : [queryParams.types],
      };
    }
  
    if (queryParams.stars) {
      const starRatings = Array.isArray(queryParams.stars)
        ? queryParams.stars.map((star: string) => parseInt(star))
        : parseInt(queryParams.stars);
  
      constructedQuery.starRating = { $in: starRatings };
    }
  
    if (queryParams.maxPrice) {
      constructedQuery.pricePerNight = {
        $lte: parseInt(queryParams.maxPrice).toString(),
      };
    }
  
    return constructedQuery;
  };


export default router