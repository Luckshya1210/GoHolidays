import { hotelFacilities } from '../../config/hotel-options'
import { useFormContext } from 'react-hook-form'
import { formData } from './ManageHotelForm';
const Facilities = () => {
  const {register,formState:{errors}}=useFormContext<formData>();

    return (
    <div>
        <h2 className='text-2xl   mb-3 font-bold'>Facilities</h2>
        <div className='grid grid-cols-5 gap-3'>
            
            {hotelFacilities.map((facility)=>(
                <label className='gap-1 flex text-sm text-gray-700'>
                    <input type='checkbox' value={facility} {...register("facilities",{
                        validate:(facilities)=>{
                            if(facilities.length>0 && facilities){
                                return true;
                            }else{
                                return "Facilites cannot be empty"
                            }
                        }
                    })} ></input>
                    {facility}
                </label>
            ))}
        </div>
        {errors.facilities && (
            <span className='text-red-500 text-sm font-bold'>
                {errors.facilities.message}
            </span>
        )}
    </div>
  )
}

export default Facilities