import express,{Request,Response} from 'express'
import User from '../models/user'
import jwt from "jsonwebtoken"
// import nodemailer from 'nodemailer'
import verifytoken from '../middleware/auth';

import { check, validationResult } from "express-validator";
const router=express.Router();
const nodemailer = require("nodemailer");
const transporter = nodemailer.createTransport({
    service: "Gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_ID,
      pass: process.env.MAIL_SECRET,
    },
  });

router.post('/register',[check("firstName","Firstname is required").isString(),check("lastName","Lastname is required").isString(),check("email","email is required").isEmail(),check("password","password with 6 or more characters reqd").isLength({min:6})],async(req:Request,res:Response)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(400).json({message:err.array()})
    }
    try{
        let user=await User.findOne({
            email:  req.body.email
        })

        if(user){
            return res.status(400).json({message:"User already exists"})
        }
        user=new User(req.body)
        
        const token=jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string ,{expiresIn:"1d"});
        
        res.cookie("auth_token",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV==="production",
            maxAge:86400000
        })
        
        await user.save()
        return res.status(200).send({message:"Register success"});
        
    }catch(error){
        console.log(error);
        return res.status(500).send({message:"Something went wrong!"})
    }
})

router.get('/me',verifytoken,async(req:Request,res:Response)=>{
    
    try{
        const user=req.userId;
        const userinfo=await User.findById(user).select('-password');
        if(!userinfo){
            return res.status(501).json({message:"User not found"})
        }
        res.json(userinfo);
    }catch(e){
        return res.status(500).send({message:"Error fetching the user"})
    }
})
router.post(`/booking`,async(req:Request,res:Response)=>{
    try{
        const usermail=req.body.email;
        const info = await transporter.sendMail({
            from: '"Go holidays" <turfysurfer@gmail.com>', // sender address
            to: usermail, // list of receivers
            subject: "Booking status update from goHolidays", // Subject line
            text: "Your booking confirmed", // plain text body
            // html: "<b>Hello world?</b>", // html body
          });
          if(!info.messageId){
            return res.sendStatus(401);
          }
        //   console.log(info.response);
        return res.status(200).send({message:info.messageId})
    }catch(e){
        console.log(e);
        return res.status(500).send({message:"Error delivering email"})
    }
})

export default router