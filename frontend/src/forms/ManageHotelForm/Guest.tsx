import { useFormContext } from 'react-hook-form'
import { formData } from './ManageHotelForm';

const Guest = () => {
    const {register,formState:{errors}}=useFormContext<formData>();
  return (
    <div>
        <h2 className='font-bold text-2xl mb-3' >Guests</h2>
        <div className='grid grid-cols-2 gap-5 px-6 py-6 bg-gray-300 '>
            <label className='text-gray-700 font-semibold text-2l flex-1  '>
                Adults
                <input type="number" min={1} className='border rounded font-normal w-full px-2 py-2' {...register("adultCount",{required:"This field is required"})} ></input>
                {errors.adultCount && (
                        <span className='text-red-500'>
                            {errors.adultCount?.message}
                        </span>
                    )}
            </label>
            <label className='text-gray-700 font-semibold text-2l flex-1  '>
                Children
                <input min={0} type="number" className='border rounded font-normal w-full px-2 py-2' {...register("childCount",{required:"This field is required"})} ></input>
                {errors.childCount && (
                        <span className='text-red-500'>
                            {errors.childCount.message}
                        </span>
                    )}
            </label>
        </div>
    </div>
  )
}

export default Guest