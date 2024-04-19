import React from 'react'
import { useForm } from 'react-hook-form'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode'
export type RegisterFormData={
    email:string,
    password:string,
    confirmPassword:string,
    firstName:string,
    lastName:string
}
const Registerr = () => {
    
    const {showToast}=useAppContext()
    const navigate=useNavigate();
    const query=useQueryClient();
    const {mutate}=useMutation(apiClient.googleAuth,{
        onSuccess:async()=>{
            toast.success('Logged In successfully')
            
            await query.invalidateQueries("validateToken")
            
            
            navigate("/")
        },onError:(err:Error)=>{
            toast.error(err.message)
        }
    })
    const googleSuccess=(res)=>{
        const t=jwtDecode(res.credential);
        localStorage.setItem('googleLogin',JSON.stringify(t));
        const cred=res.credential;
        // console.log(cred);
        mutate(cred);
        // console.log(t)
    }
    const googleError=(err)=>{
        console.log(err);
    }
    const mutation =useMutation(apiClient.register,{
    onSuccess:async()=>{
        // showToast({message:"Registration Success!",type:"SUCCESS"})
        
        toast.success('Registration Success')
            
        await query.invalidateQueries("validateToken")
        navigate("/")
    },
    onError:(err:Error)=>{
        // console.log(err.message)
        
        toast.error(err.message)
            
        // showToast({message:err.message,type:"ERROR"})
    }
    })
    const {register,watch,handleSubmit,formState:{errors}}=useForm<RegisterFormData>()
    const onSubmit=handleSubmit((val)=>{
    // console.log(val);
    mutation.mutate(val);
    }) 
  return (
    <div>
        <div>
            <div className="bg-blue-800 py-6 w-full">
            <div className="container mx-auto flex justify-between">
                    <span className="text-3xl text-white font-bold tracking-tight">
                        <Link to="/">GoHolidays</Link>
                        
                    </span>
                    
                </div>
            </div>
        </div>
        <div className='container mt-5 mx-auto flex items-center my-auto '> 
            <div className='md:px-50 mx-auto' > 
            <form className='flex flex-col gap-5' onSubmit={onSubmit}>
                <h2 className='font-bold text-3xl text-center '>
                    Create an Account
                </h2>
                <div className=" justify-center mx-auto ">
                {/* <span>Sign In with Google</span> */}
                    <GoogleLogin   onSuccess={googleSuccess} onError={googleError} />
                </div>
                <div className="relative flex  items-center">
                    <div className="flex-grow border-t border-gray-400"></div>
                    <span className="flex-shrink mx-4 text-gray-400">OR</span>
                    <div className="flex-grow border-t border-gray-400"></div>
                </div>
                <div className='flex flex-col md:flex-row gap-5'>
                    
                    <label className='text-gray-700 font-bold text-2l flex-1'>
                        FirstName
                        <input className='border font-normal rounded   w-full px-2 py-2' {...register("firstName",{required:"This field is required"})} ></input>
                        {errors.firstName && (
                            <span className='text-red-500'>
                                {errors.firstName.message}
                            </span>
                        )}
                    </label>
                    <label className='text-gray-700 font-bold text-2l flex-1'>
                        LastName
                        <input className='border rounded-5 font-normal w-full px-2 py-2' {...register("lastName",{required:"This field is required"})}></input>
                        {errors.lastName && (
                            <span className='text-red-500'>
                                {errors.lastName.message}
                            </span>
                        )}
                    </label>
                </div>
                <label className='text-gray-700 font-bold text-2l flex-1  '>
                    Email
                    <input type="email" className='border rounded font-normal w-full px-2 py-2' {...register("email",{required:"This field is required"})} ></input>
                    {errors.email && (
                            <span className='text-red-500'>
                                {errors.email.message}
                            </span>
                        )}
                </label>
                <label className='text-gray-700 font-bold text-2l flex-1'>
                    Password
                    <input type="password" className='border rounded font-normal w-full px-2 py-2' {...register("password",{required:"This field is required",minLength:{value:6,message:"Password must be of atleast 6 characters"}})} ></input>
                    {errors.password && (
                            <span className='text-red-500'>
                                {errors.password.message}
                            </span>
                        )}
                </label>
                <label className='text-gray-700 font-bold text-2l flex-1 '>
                    Confirm Password
                    <input type="password" className='border rounded font-normal w-full px-2 py-2' {...register("confirmPassword",{validate:(val)=>{
                        if(!val){
                            return "This field is required"
                        }else if(watch("password")!==val){
                            return "Your passwords do not match"
                        }

                    }})} ></input>
                    {errors.confirmPassword && (
                            <span className='text-red-500'>
                                {errors.confirmPassword.message}
                            </span>
                        )}
                </label>
                <span className="flex justify-between items-center" >
                    <span className="text-sm">
                        Already have an account? <Link className="underline" to='/signin'>Login here</Link>
                    </span>
                </span>
                <span className='w-full' >
                    <button type="submit" className='items-center w-full rounded-md py-3 px-3 border bg-blue-600 text-white p-2 font-bold hover:bg-blue-800   hover:bg-opacity-63 text-xl'>Create Account</button>
                </span>
            </form></div>
        </div>
    </div>
  )
}

export default Registerr