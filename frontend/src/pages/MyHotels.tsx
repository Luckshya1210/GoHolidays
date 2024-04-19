import React from 'react'
import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import { Link } from 'react-router-dom'
import { BsBuilding, BsMap } from 'react-icons/bs'
import { BiHotel, BiMoney, BiStar } from 'react-icons/bi'
const MyHotels = () => {
    const {data:hotelData}=useQuery("fetchHotels",apiClient.fetchHotels,{
        onError:()=>{
            return 
        }
    })
    if(!hotelData){
        return (<span className='text-3xl font-bold'>No Hotels found</span>)
    }
  return (
    <div className='space-y-5'>
        <span className='flex justify-between' > 
            <h2 className='font-bold text-3xl '>My Hotels</h2>
            <Link to='/add-hotel' className='bg-blue-600 font-bold rounded-sm text-white p-2 hover:bg-blue-800'>Add Hotel</Link>
        </span>
        <div className='flex flex-col gap-8'>
            {hotelData.map((hotel)=>(
                <div className='border rounded-lg gap-5 border-slate-300 flex flex-col justify-between p-8' >
                    <h2 className='text-2xl font-bold' >{hotel.name}</h2>
                    <div className='whitespace-pre-line' >{hotel.description}</div>
                    <div className='grid grid-cols-5 gap-2' >
                        <div className='border border-slate-300 rounded-sm flex items-center p-3' >
                            <BsMap className='mr-1' />
                            {hotel.city}, {hotel.country}
                        </div>
                        <div className='border border-slate-300 rounded-sm flex items-center p-3' >
                            <BsBuilding className='mr-1' />
                            {hotel.type}
                        </div>
                        <div className='border border-slate-300 rounded-sm flex items-center p-3' >
                            <BiMoney className='mr-1' />
                            ${hotel.pricePerNight} per night
                        </div>
                        <div className='border border-slate-300 rounded-sm flex items-center p-3' >
                            <BiHotel className='mr-1' />
                            {hotel.adultCount} adults, {hotel.childCount} children
                        </div>
                        <div className='border border-slate-300 rounded-sm flex items-center p-3' >
                            <BiStar className='mr-1' />
                            {hotel.starRating} Star Rating
                        </div>
                    </div>
                    <span className='flex justify-end gap-4'>
                        <Link className='bg-blue-600 rounded-sm font-bold text-white text-1xl p-2 hover:bg-blue-800' to={`/detail/${hotel._id}`}>View details</Link>
                        <Link className='bg-blue-600 rounded-sm font-bold text-white text-1xl p-2 hover:bg-blue-800' to={`/edit-hotel/${hotel._id}`}>Edit details</Link>

                    </span>
                </div>
            ))}
        </div>

    </div>
  )
}

export default MyHotels