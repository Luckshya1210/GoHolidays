import React from 'react' 
import { hotelTypes } from '../config/hotel-options';
type Props={
    selectedHotelTypes:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
} 
 
const HotelTypesFilter = ({selectedHotelTypes,onChange}:Props) => {
  return (
    <div className='pb-5 border-b border-slate-300'>
        <h3 className='font-semibold text-md mb-2' >Hotel Type</h3>
        {hotelTypes.map((hotelType)=>(
            <label className='flex space-x-2 items-center '>
                <input className='rounded' type='checkbox' checked={selectedHotelTypes.includes(hotelType)} onChange={onChange} value={hotelType} />
                <span className=''>{hotelType}</span>
            </label>
        ))}
    </div>
  )
}

export default HotelTypesFilter