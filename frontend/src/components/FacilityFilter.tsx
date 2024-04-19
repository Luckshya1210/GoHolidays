import React from 'react' 
import { hotelFacilities } from '../config/hotel-options';
type Props={
    selectedfacilities:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
} 
 
const FacilityFilter = ({selectedfacilities,onChange}:Props) => {
  return (
    <div className='pb-5 border-b border-slate-300'>
        <h3 className='font-semibold text-md mb-2' >Facilities</h3>
        {hotelFacilities.map((facilityType)=>(
            <label className='flex space-x-2 items-center '>
                <input className='rounded' type='checkbox' checked={selectedfacilities.includes(facilityType)} onChange={onChange} value={facilityType} />
                <span className=''>{facilityType}</span>
            </label>
        ))}
    </div>
  )
}

export default FacilityFilter