import React, { FormEvent, useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { MdTravelExplore } from 'react-icons/md';
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { useNavigate } from 'react-router-dom';
import { FaChildren } from 'react-icons/fa6';
const SearchBar = () => {
    const search=useSearchContext();
    const [destination,setdestination]=useState<string>(search.destination);
    const [checkIn,setcheckIn]=useState<Date>(search.checkIn)
    const [checkOut,setcheckOut]=useState<Date>(search.checkOut)
    const [adultCount,setadultCount]=useState<number>(search.adultCount)
    const [childCount,setchildCount]=useState<number>(search.childCount)
    const mindate=new Date()
    const navigate=useNavigate()
    const maxdate=new Date()
    maxdate.setFullYear(maxdate.getFullYear()+1)
    //not changing the context directly globally as it will re render the app again on any changes
    const handleSubmit=(event:FormEvent)=>{
        event.preventDefault(); //to prevent automatic form post requests
        search.saveSearchValues(destination,checkIn,checkOut,adultCount,childCount);
        navigate('/search')
    }
  return (
    <div>
        
        <form onSubmit={handleSubmit} className='bg-orange-400 rounded-l   shadow-md grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-[4fr_2fr_1fr_1fr_1fr] items-center gap-[3px] -mt-8 p-1 ' > 
            <div className='flex flex-row items-center flex-1 bg-white p-4 w-full  ' >
                <MdTravelExplore className='mr-2 ' size={25} />
                <input placeholder='Where are you going?' className='text-md w-full focus:outline-none' value={destination} onChange={(e)=>setdestination(e.target.value)} />
            </div>
            <div className='flex bg-white px-3 py-3 gap-2 items-center   w-full'  >
                <label className='flex items-center'>

                    Adults:
                    <input className='focus:outline-none w-full p-1 font-bold' min={1} max={20} value={adultCount} onChange={(e)=>{setadultCount(parseInt(e.target.value))}} type='number' />
                </label>
                <label className='flex  items-center'> 
                    Children:
                    <input className='focus:outline-none w-full p-1 font-bold' min={0} max={20} value={childCount} onChange={(e)=>{setchildCount(parseInt(e.target.value))}} type='number' />
                </label>
            </div>

            <div className='p-2 bg-white w-full '>
                <DatePicker wrapperClassName='min-w-full' required selected={checkIn} placeholderText='Check In date' className='min-w-full bg-white p-2 focus:outline-none' minDate={mindate} maxDate={maxdate} selectsStart startDate={checkIn} endDate={checkOut} onChange={(date)=>setcheckIn(date as Date)}/>
            </div>
            <div className='p-2 bg-white w-full '>
                <DatePicker wrapperClassName='min-w-full' required selected={checkOut} placeholderText='Check Out date' className='min-w-full   bg-white p-2 focus:outline-none' minDate={mindate} maxDate={maxdate} selectsStart startDate={checkIn} endDate={checkOut} onChange={(date)=>setcheckOut(date as Date)}/>
            </div>
            <div className='flex gap-1 h-full items-center'>
                <button className='bg-blue-600 transition ease-in-out p-3 rounded-sm text-white font-bold text-xl hover:bg-blue-800 h-full w-full'>
                    Search
                </button>
                {/* <button className='bg-red-600 p-3 rounded-full text-white font-bold text-xl hover:bg-red-500 w-[40%]'>
                    Clear
                </button> */}
            </div>
        </form>
        
    </div>
  )
}

export default SearchBar