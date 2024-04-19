import React, { useEffect, useState } from 'react'
import * as apiClient from '../api-client'
import { useQuery } from 'react-query'
import BookingForm from '../forms/BookingForm/BookingForm';
import { useSearchContext } from '../contexts/SearchContext';
import { useParams } from 'react-router-dom';
import BookingSummary from '../components/BookingSummary';
import { Elements } from '@stripe/react-stripe-js';
import { useAppContext } from '../contexts/AppContext';
const Booking = () => {
    let g=1;
    if(localStorage.getItem('googleLogin')){g=0;}
    const {data:userData}=useQuery('fetchByUserid',apiClient.fetchUserById,{enabled:!!g});
    const search=useSearchContext();
    const {hotelId}=useParams();
    const {stripePromise}=useAppContext()
    const [noofNights,setnoofNights]=useState<number>(0);
    useEffect(()=>{
        if(search.checkIn && search.checkOut){
            const nights= Math.abs(search.checkIn.getTime()-search.checkOut.getTime())/(1000*60*60*24);
            
            setnoofNights(Math.ceil(nights))
            
        }
    },[search.checkIn,search.checkOut])
    const {data:hotel}=useQuery("fetchhotelbyid",()=>apiClient.fetchByHotelId(hotelId as string),{enabled:!!hotelId});
    if(!hotel){
        return (
            <>
                No hotel found
            </>
        )
    }
    const {data:paymentIntentData}=useQuery("createPaymentIntent",()=>apiClient.createPaymentIntent(hotelId as string,noofNights.toString()),
    {
        enabled:!!hotelId && noofNights>0
    })
    return (
    <div className='grid md:grid-cols-[1fr_2fr] gap-5'>
        <BookingSummary checkIn={search.checkIn} checkOut={search.checkOut} adultCount={search.adultCount} childCount={search.childCount} noofNights={noofNights} hotel={hotel} />
        {paymentIntentData &&
        (<Elements stripe={stripePromise} options={{clientSecret:paymentIntentData.clientSecret}} >

            <BookingForm currentUser={userData} paymentIntent={paymentIntentData} />   </Elements>)} 
       
    </div>
  )
}

export default Booking