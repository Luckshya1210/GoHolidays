import React from 'react'
import { HotelType } from '../../../backend/src/models/hotel';

type Props={
    checkIn:Date;
    checkOut:Date;
    adultCount:number;
    childCount:number;
    noofNights:number;
    hotel:HotelType;
}

const BookingSummary = ({checkIn,checkOut,adultCount,childCount,noofNights,hotel}:Props) => {

  return (
    <div className='grid gap-4 rounded-lg border border-slate-300 rounded-lg p-5 h-fit'>
        <h2 className='text-xl font-bold'>Your booking details</h2>
        <div className='border-b py-2'>
            Location:
            <div className='font-bold'>{`${hotel.name}, ${hotel.city}, ${hotel.country}`}</div>
        </div>
        <div className='flex justify-between'>
            <div>
                Check-in
                <div className='font-bold'>{checkIn.toDateString()}</div>
            </div>
            <div>
                Check-out
                <div className='font-bold'>{checkOut.toDateString()}</div>
            </div>
        </div>
        <div className='border-t border-b py-2'>
            Total nights of stay:
            <div className='font-bold'>
                {noofNights}
            </div>
        </div>
        <div >
            Guests:
            <div className='font-bold'>{adultCount} adults & {childCount} children</div>
        </div>
    </div>
  )
}

export default BookingSummary