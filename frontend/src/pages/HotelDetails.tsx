import React from 'react'
import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import { useParams } from 'react-router-dom'
import { AiFillStar } from 'react-icons/ai'
import GuestInfo from '../forms/GuestForms/GuestInfo'
import { FaCarAlt, FaPlaneDeparture, FaWifi } from 'react-icons/fa'
import { GiThreeLeaves } from 'react-icons/gi'
import { MdFamilyRestroom, MdPool } from 'react-icons/md'
import { TbSmokingNo } from 'react-icons/tb'
import { IoIosFitness } from 'react-icons/io'
const HotelDetails = () => {
    const {hotelId}=useParams();
    const {data:hotel}=useQuery("fetchhotelbyid",()=>apiClient.fetchByHotelId(hotelId as string),{enabled:!!hotelId});
    console.log(hotel);
    if(!hotel){
        return (
            <>
                No hotel found here
            </>
        )
    }
  return (
    <div className='space-y-6'>
        <div>
            <span className='flex '>
                {Array.from({length:hotel.starRating}).map(()=>(
                    <AiFillStar className='fill-yellow-400'/>
                ))}
            </span>
            <h1 className='font-bold text-3xl'>{hotel.name}</h1>

        </div>

        <div className='grid grid-cols-1 lg:grid-cols-3 gap-4'>
            {hotel.imageUrls.map((image)=>(
                <div className='h-[300px]'>
                    <img alt={hotel.name} src={image} className='rounded-md h-full w-full object-cover object-center' />
                </div>
            ))}
        </div>
        

        <div className='grid grid-cols-1 lg:grid-cols-4 gap-2' >
            {hotel.facilities.map((facility)=>(
                <div className='border border-slate-500 rounded-md p-3 items-center flex  gap-3'>
                    {facility==="Airport Shuttle"?<FaPlaneDeparture  />:""}
                    {facility==="Spa"?<GiThreeLeaves />:""}
                    {facility==="Parking"?<FaCarAlt />:""}
                    {facility==="Free WiFi"?<FaWifi />:""}
                    {facility==="Family Rooms"?<MdFamilyRestroom />:""}
                    {facility==="Non-Smoking Rooms"?<TbSmokingNo />:""}
                    {facility==="Outdoor Pool"?<MdPool />:""}
                    {facility==="Fitness Center"?<IoIosFitness />:""}
                    
                    {facility}
                </div>
            ))}
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-[2fr_1fr]'>
            <div className='whitespace-pre-line'>{hotel.description}</div>
            <div className=''>
                <GuestInfo pricePerNight={hotel.pricePerNight} hotelId={hotel._id}/>
            </div>
        </div>
    </div>
  )
}

export default HotelDetails