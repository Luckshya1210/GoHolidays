import { NextFunction ,Request,Response} from "express";

import jwt, { JwtPayload } from 'jsonwebtoken'

declare global{
    namespace Express{
        interface Request{
            userId:string
        }
    }
}

const verifytoken=(req:Request,res:Response,next:NextFunction)=>{
    const token=req.cookies["auth_token"];
    
    // const googleToken=req.cookies["user_id"];
    if(!token){
        return res.status(401).json({message:"unauthorized access1"});

    }
    try{
        // || ? if(!)
        const len=token.length
        if(len<500){
            const decoded=jwt.verify(token,process.env.JWT_SECRET_KEY as string);
            req.userId=(decoded as JwtPayload).userId;
        }else{
            const decoded=jwt.decode(token);
            req.userId=((decoded as JwtPayload).sub) || '';
        }
        next()
    }catch(err){
        return res.status(401).json({message:"unauthorized access"});
    }
}


export default verifytoken