import React from 'react'
import { useQuery } from 'react-query'
import * as apiClient from '../api-client'
import { Link } from 'react-router-dom';
const MyBookings = () => {
    const {data:hotels}=useQuery("fetchUserBookings",apiClient.fetchMyBookings);
    if(!hotels || hotels.length===0 ){
        return (
            <div className='font-bold text-3xl'>
                No Bookings Found
            </div>
        )
    }
  return (
    <div className='space-y-5'>
        <h1 className='font-bold text-3xl'>My Bookings</h1>
        {hotels.map((hotel)=>(
            <div className='grid grid-cols-1 lg:grid-cols-[1fr_3fr] gap-5 p-8 rounded-lg border border-slate-300'>
                <div className='lg:w-full lg:h-[250px]'>
                    <Link to={`/detail/${hotel._id}/`}>
                        <img src={hotel.imageUrls[0]} className='object-cover object-center w-full h-full'  />
                    </Link>
                </div>
                <div className='flex flex-col gap-4 max-h-[300px] overflow-y-auto' >
                    <div className='font-bold text-2xl'>
                        <Link to={`/detail/${hotel._id}/`}>
                            {hotel.name}
                        </Link>
                        <div className='text-xs font-normal'>
                            {hotel.city}, {hotel.country}
                        </div>
                    </div>
                    {hotel.bookings.map((booking)=>(
                        <div>
                            <div>
                                <span className='font-bold mr-2'>Dates: </span>
                                <span>{new Date(booking.checkIn).toDateString()} - {new Date(booking.checkOut).toDateString()}</span>
                            </div>
                            <div>
                                <span className='font-bold mr-2'>Guests: </span>
                                <span>{booking.adultCount} adults , {booking.childCount} children</span>
                        
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        ))}
    </div>
  )
}

export default MyBookings