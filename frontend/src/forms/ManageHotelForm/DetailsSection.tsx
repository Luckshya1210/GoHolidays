import { useFormContext } from 'react-hook-form'
import { formData } from './ManageHotelForm';


const DetailsSection = () => {
    const {register,formState:{errors}}=useFormContext<formData>();
  return (
    <div className='flex flex-col gap-4' >
        <h1 className='font-bold text-3xl mb-3 ' >Add Hotel</h1>
        <label className='text-gray-700 font-bold text-2l flex-1  '>
            Name
            <input type="name" className='border rounded font-normal w-full px-2 py-2' {...register("name",{required:"This field is required"})} ></input>
            {errors.name && (
                    <span className='text-red-500'>
                        {errors.name.message}
                    </span>
                )}
        </label>
        <div className='flex gap-4'>
            <label className='text-gray-700 font-bold text-2l flex-1  '>
                City
                <input type="city" className='border rounded font-normal w-full px-2 py-2' {...register("city",{required:"This field is required"})} ></input>
                {errors.city && (
                        <span className='text-red-500'>
                            {errors.city.message}
                        </span>
                    )}
            </label>
            <label className='text-gray-700 font-bold text-2l flex-1  '>
                Country
                <input type="country" className='border rounded font-normal w-full px-2 py-2' {...register("country",{required:"This field is required"})} ></input>
                {errors.country && (
                        <span className='text-red-500'>
                            {errors.country.message}
                        </span>
                    )}
            </label>
        </div>
        <label className='text-gray-700 font-bold text-2l flex-1  '>
            Description
            <textarea  rows={10} className='border rounded font-normal w-full px-2 py-2' {...register("description",{required:"This field is required"})} ></textarea>
            {errors.description && (
                    <span className='text-red-500'>
                        {errors.description.message}
                    </span>
                )}
        </label>
        <label className='text-gray-700 font-bold text-2l max-w-[50%]   '>
                Price Per Night
                <input type="number" min={1} className='border rounded font-normal w-full px-2 py-2' {...register("pricePerNight",{required:"This field is required"})} ></input>
                {errors.pricePerNight && (
                        <span className='text-red-500'>
                            {errors.pricePerNight.message}
                        </span>
                    )}
        </label>
        <label className='text-gray-700 font-bold text-2l max-w-[50%]   '>
                Star Rating
                <select {...register("starRating",{required:"This field is required"})} className='border rounded w-full p-2 text-gray-700 font-normal' >
                    <option value="" className='text-sm font-bold'>
                        Select a Rating
                    </option>

                    {[1,2,3,4,5].map((n)=>(
                        <option value={n}>{n}</option>
                    ))}
                </select>
                {errors.starRating && (
                        <span className='text-red-500'>
                            {errors.starRating.message}
                        </span>
                    )}
        </label>
      

    </div>
  )
}

export default DetailsSection