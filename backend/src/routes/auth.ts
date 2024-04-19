import express,{Request,Response} from 'express'
import { validationResult,check } from 'express-validator';
import User from '../models/user'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import verifytoken from '../middleware/auth';
const router=express.Router();

router.post('/login',[check("email","email is required").isEmail(),check("password","password with 6 or more characters reqd").isLength({min:6})],async(req:Request,res:Response)=>{
    const err=validationResult(req);
    if(!err.isEmpty()){
        return res.status(403).json({message:err.array()})
    }
    const {email,password}=req.body;
    try{
        const user=await User.findOne({email});

        if(!user){
            return res.status(401).json({message:"Invalid credentials!"})
        }

        const isMatch=await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.status(405).json({message:"Invalid credentials!"})
        }

        const token=  jwt.sign({userId:user.id},process.env.JWT_SECRET_KEY as string,{expiresIn:"1d"});

        res.cookie("auth_token",token,{httpOnly:true,secure:process.env.NODE_ENV==="production",maxAge:86400000})


        return res.status(200).json({userId:user._id})

    }catch(error){
        console.log(error);
        return res.status(402).json({message:"something went wrong!"})
    }

})
router.post('/google-auth',(req:Request,res:Response)=>{
    try{
        const token=req.body.cred;
        // console.log(token);
        res.cookie("auth_token",token,{httpOnly:true,secure:process.env.NODE_ENV==="production",maxAge:86400000});
        return res.status(200).json({googleCred:token});
    }catch(e){
        return res.sendStatus(503);

    }
})
router.get("/validate-token",verifytoken,(req:Request,res:Response)=>{
    res.status(200).send({userId:req.userId})
})
router.post("/logout",(req:Request,res:Response)=>{
 
        res.cookie("auth_token",{
            expires:new Date(0),
        })
   
    res.send()
})

export default router