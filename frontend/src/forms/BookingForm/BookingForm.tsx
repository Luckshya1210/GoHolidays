import React from 'react'
import { UserType } from '../../../../backend/src/models/user'
import { useForm } from 'react-hook-form'
import { paymentIntentType } from '../../../../backend/src/routes/hotels'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { StripeCardElement } from '@stripe/stripe-js'
import { useSearchContext } from '../../contexts/SearchContext'
import { useNavigate, useParams } from 'react-router-dom'
import { useMutation } from 'react-query'
import * as apiClient from '../../api-client'
import { useAppContext } from '../../contexts/AppContext'
import toast from 'react-hot-toast'
type Props={
    currentUser?:UserType,
    paymentIntent:paymentIntentType
}
export type BookingFormData={
    firstName:string;
    lastName:string;
    email:string;
    adultCount:number;
    childCount:number;
    checkIn:string;
    checkOut:string;
    hotelId:string;
    paymentIntentId:string;
    totalCost:number;
}
const BookingForm = ({currentUser,paymentIntent}:Props) => {
    const stripe=useStripe();
    const element=useElements();
    const search=useSearchContext();
    const {hotelId}=useParams();
    const navigate=useNavigate();
    let googl=0;
    let gid;
    if(!currentUser){
        if(localStorage.getItem('googleLogin')){
            gid=JSON.parse((localStorage.getItem('googleLogin'))||"");
            googl=1;
        }else{

            return (
                <>
                    <h3 className='font-bold text-3xl' >Unable to book right now</h3>
                </>
            )

        }
    }

    const {handleSubmit,register}=useForm<BookingFormData>({
        defaultValues:{
            firstName:(googl===0? currentUser?.firstName:gid.given_name),
            lastName:(googl===0? currentUser?.lastName:gid.family_name),
            email:(googl===0? currentUser?.email:gid.email),
            adultCount:search.adultCount,
            childCount:search.childCount,
            checkIn:search.checkIn.toISOString(),
            checkOut:search.checkOut.toISOString(),
            hotelId:hotelId,
            paymentIntentId:paymentIntent.paymentIntentId,
            totalCost:paymentIntent.totalCost
        }
    });
    const {showToast}=useAppContext();
    const {mutate:Mail}=useMutation(apiClient.deliverMail,{
        onSuccess:()=>{
            // console.log("success email")
        },onError:()=>{
            // console.log("error email");
        }
    });
    const {mutate:bookRoom,isLoading}=useMutation(apiClient.createBooking,{
        onSuccess:()=>{
            // showToast({message:"Your room has been booked succesfully!",type:"SUCCESS"})
            Mail((googl===0? currentUser?.email:gid.email) as string);
            toast.success('Your room has been booked succesfully, Check your email for conformation!');
            navigate('/');
        },
        onError:()=>{
            toast.error('Error saving your booking')
            // showToast({message:"Error saving your booking",type:"ERROR"})
        }
    })
    //4000003560000008
    const onSubmit=async(formData:BookingFormData)=>{
        if(!stripe || !element){return;}
        const res=await stripe.confirmCardPayment(paymentIntent.clientSecret,{
            payment_method:{
                card: element.getElement(CardElement) as StripeCardElement,
                
            }
        })
        console.log(res);
        if(res.paymentIntent?.status==="succeeded"){
            //book the room
            bookRoom({...formData,paymentIntentId:res.paymentIntent.id})
        }
    }
  return (
    <div >
        <form onSubmit={handleSubmit(onSubmit)} className=' rounded-lg border border-slate-300 p-5 grid-cols-1 grid gap-5'>
            <span className='text-3xl font-bold'>Confirm Your Details</span>
            <div className='grid-cols-2 grid gap-6'>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    First Name
                    <input className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal' type='text' disabled {...register("firstName")} />
                </label>
                <label className='text-gray-700 text-sm font-bold flex-1'>
                    Last Name
                    <input className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal' type='text' disabled {...register("lastName")} />
                </label>
            </div>
            <label className='text-gray-700 text-sm font-bold flex-1'>
                    Email
                <input className='mt-1 border rounded w-full py-2 px-3 text-gray-700 bg-gray-200 font-normal' type='text' disabled {...register("email")} />
            </label>
            <div className='space-y-2' >
                <h2 className='text-xl font-semibold'>Your Price Summary</h2>
                <div className='bg-blue-200 p-4 rounded-md' >
                    <div className='font-semibold text-lg'>
                        Total Cost: ${paymentIntent.totalCost.toFixed(2)}
                    </div>
                    <div className='text-xs'>Includes taxes and charges</div>
                </div>
            </div>
            <div className='space-y-2'>
                <h3 className='text-xl font-semibold'>Payment Details</h3>
                <CardElement id="payment-element" className='border rounded-md p-2 text-sm'/>
            </div>
            <div className='flex justify-end'>
                <button disabled={isLoading} className='bg-blue-600 disabled:bg-gray-500 text-white p-2 font-bold hover:bg-blue-800 text-md rounded-md' type="submit">
                    {isLoading?"Saving...":"Confirm Booking"}
                    
                </button>
            </div>
        </form>
    </div>
  )
}

export default BookingForm