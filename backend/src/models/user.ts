import mongoose from "mongoose"
import bcrypt from "bcryptjs"
export type UserType={
    _id:string,
    firstName:string,
    lastName:string,
    email:string,
    password:string
}

const userSchema=new mongoose.Schema({
    email:{
        unique:true,
        type:String,
        required:true
    },
    password:{
        required:true,
        type:String
    },
    firstName:{
        required:true,
        type:String
    },
    lastName:{
        required:true,
        type:String
    }

})

userSchema.pre("save",async function(next){
    if(this.isModified('password')){
        this.password=await bcrypt.hash(this.password,8)
    }
    next()
})
const user= mongoose.model<UserType>('User',userSchema);

export default user