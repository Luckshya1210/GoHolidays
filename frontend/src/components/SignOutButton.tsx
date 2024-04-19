import React from 'react'
import { useMutation, useQueryClient } from 'react-query'
import * as apiClient from '../api-client'
import { useAppContext } from '../contexts/AppContext';
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
const SignOutButton = () => {
    // const {showToast,isLoggedIn}=useAppContext();
    const navigate=useNavigate()
    const query=useQueryClient();
    const mutation=useMutation(apiClient.signout,{
        onSuccess:async()=>{
            await query.invalidateQueries("validateToken")
            // showToast({message:"Log out success",type:"SUCCESS"})
            toast.success('Log out success')
            navigate("/signin")
        },
        onError:(err:Error)=>{
            // console.log(err.message)
            toast.error(err.message);
            // showToast({message:err.message,type:"ERROR"})
        }
    })
    const handleclick=()=>{
        googleLogout();
        localStorage.removeItem('googleLogin')
        mutation.mutate();
    }
  return (
    <button className='text-blue-600 px-3 rounded-sm font-bold bg-white hover:bg-gray-100' onClick={handleclick}>
        Sign Out
    </button>
  )
}

export default SignOutButton