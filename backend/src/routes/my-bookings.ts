import express,{Request,Response} from 'express'
import verifytoken from '../middleware/auth';
import Hotel, { HotelType } from '../models/hotel';

const router=express.Router();


router.get('/',verifytoken,async(req:Request,res:Response)=>{
    try{
        const hotels=await Hotel.find({
            bookings:{$elemMatch:{userId:req.userId}}
        })
        const results=hotels.map((hotel)=>{
            const bookings=hotel.bookings.filter((bookin)=>bookin.userId===req.userId)
            const updatedHotel={
                ...hotel.toObject(),bookings:bookings
            }
            return updatedHotel;
        })
        res.status(200).send(results);
    }catch(e){
        console.log(e);
        res.status(500).send({message:"Error fetching bookings"});
    }
})

export default router;
