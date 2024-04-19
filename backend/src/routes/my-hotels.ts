import express from "express";
import {Request,Response} from 'express'
import multer from 'multer'
import cloudinary from 'cloudinary'
import Hotel, { HotelType } from "../models/hotel";
import verifytoken from "../middleware/auth";
import { body } from "express-validator";
const router=express.Router()


const storage=multer.memoryStorage()

const upload=multer({
    storage:storage,
    limits:{
        fileSize:5*1024*1024
    }
})

router.post('/',verifytoken, [
    body("name").notEmpty().withMessage("Name is required"),
    body("city").notEmpty().withMessage("City is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("description").notEmpty().withMessage("Description is required"),
    body("type").notEmpty().withMessage("Hotel type is required"),
    body("pricePerNight")
      .notEmpty()
      .isNumeric()
      .withMessage("Price per night is required and must be a number"),
    body("facilities")
      .notEmpty()
      .isArray()
      .withMessage("Facilities are required"),
  ],upload.array("imageFiles",6),async(req:Request,res:Response)=>{
    try{
        const imageFiles=req.files as Express.Multer.File[];
        const newHotel:HotelType=req.body
    

        const imageUrls = await uploadImages(imageFiles);  //waits for images to be uploaded
        
        newHotel.imageUrls=imageUrls;
        newHotel.lastUpdated=new Date();

        newHotel.userId=req.userId;

        const hotel=new Hotel(newHotel)
        
        await hotel.save()

        return res.status(201).send(hotel);

    }catch(e){
        console.log("Error creating hotel: ",e);
        res.status(500).json({message:"Something went wrong"})
    }   
})

router.get('/',verifytoken,async(req:Request,res:Response)=>{
    try{
        const hotel=await Hotel.find({userId:req.userId});
        res.json(hotel);
    }catch(e){
        return res.status(502).send({message:"Error fetching hotels"})
    }
})

router.get('/:id',verifytoken,async(req:Request,res:Response)=>{
    try{
        const hotelId=req.params.id.toString();
        const hotel=await Hotel.findOne({_id:hotelId,userId:req.userId});
        res.json(hotel);
    }catch(e){
        res.status(501).send({message:"Error fetching hotel"});
    }
})

router.put('/:id',verifytoken,upload.array('imageFiles'),async(req:Request,res:Response)=>{
    try{
        const updatedHotel:HotelType=req.body;
        
        updatedHotel.lastUpdated=new Date();

        const hotel=await Hotel.findOneAndUpdate({_id:req.params.id,userId:req.userId},updatedHotel,{new:true});

        if(!hotel){
            return res.status(501).json({message:"Hotel not found"});

        }


        const newImages=req.files as Express.Multer.File[];
        const newImageUrls=await uploadImages(newImages);

        hotel.imageUrls=[...(updatedHotel.imageUrls || [] ),...newImageUrls];

        await hotel.save();

        return res.status(200).json(hotel);
        

    }catch(e){
        return res.status(507).send({message:"Something went wrong"});
    }
    
})

async function uploadImages(imageFiles: Express.Multer.File[]) {
    const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString("base64");
        //convert image to base 64 string
        let dataUri = "data:" + image.mimetype + ";base64," + b64;
        const res = await cloudinary.v2.uploader.upload(dataUri);
        return res.url;
    });
    const imageUrls = await Promise.all(uploadPromises); //waits for images to be uploaded
    return imageUrls;
}

export default router