import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query";
import * as apiClient from '../api-client'
import { useAppContext } from "../contexts/AppContext";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
export type SignIndata={
    email:string;
    password:string;
}
const SignIn=()=>{
    const {showToast}=useAppContext()
    const query=useQueryClient()
    const navigate=useNavigate();
    const location=useLocation();
    const {register,formState:{errors},handleSubmit}=useForm<SignIndata>()
    const mutation=useMutation(apiClient.signin,{
        onSuccess:async()=>{
            // showToast({message:"Logged in successfully",type:"SUCCESS"})
            
            toast.success('Logged In successfully')
            
            await query.invalidateQueries("validateToken")
            
            
            navigate( location?.state?.from?.pathname || "/")

            // console.log("user has been signed in")
        },
        onError:async(err:Error)=>{
            
            toast.error(err.message)
            
            // showToast({message:err.message,type:"ERROR"})
        }
    })
    const onSubmit=handleSubmit((data)=>{
        mutation.mutate(data);
    })
    return (
        <div  >  
        <form className="flex flex-col gap-5" onSubmit={onSubmit} >
            <h2 className="text-3xl font-bold text-center">Sign In to your account</h2>
            <label className='text-gray-700 font-bold text-2l   '>
                Email
                <input type="email" className='border rounded font-normal w-full px-2 py-2' {...register("email",{required:"This field is required"})} ></input>
                {errors.email && (
                        <span className='text-red-500'>
                            {errors.email.message}
                        </span>
                    )}
            </label>
            <label className='text-gray-700 font-bold text-2l '>
                Password
                <input type="password" className='border rounded font-normal w-full px-2 py-2' {...register("password",{required:"This field is required",minLength:{value:6,message:"Password must be of atleast 6 characters"}})} ></input>
                {errors.password && (
                        <span className='text-red-500'>
                            {errors.password.message}
                        </span>
                    )}
            </label>
            <span className="flex justify-between items-center" >
                <span className="text-sm">
                    Not Registered? <Link className="underline" to='/register'>Create an account here</Link>
                </span>
            </span>
                <button type="submit" className='items-center rounded-md py-3 px-3 border bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl'>Login</button>
        </form></div>
    )
}

export default SignIn