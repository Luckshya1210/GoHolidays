import React from 'react'
import { useFormContext } from 'react-hook-form'
import { formData } from './ManageHotelForm';

const Images = () => {
    const {register,formState:{errors},watch,setValue}=useFormContext<formData>();
    const existUrls=watch('imageUrls')
    const handleDelete=(event:React.MouseEvent<HTMLButtonElement,MouseEvent>,imageurl :string)=>{
        event.preventDefault();
        setValue("imageUrls",existUrls.filter((url)=>url!==imageurl))
    }
  return (
    <div>
        <h2 className='font-bold text-2xl mb-3' >Images</h2>
        <div className='border rounded p-4 flex flex-col gap-4 ' >
            {existUrls && (
                <div className='grid grid-cols-6 gap-4'>
                    {existUrls.map((url)=>(
                        <div className='relative group'>
                            <img src={url} className='min-h-full object-cover' /> 
                            <button onClick={(e)=>handleDelete(e,url)} className=' absolute inset-0 text-white group-hover:opacity-100 bg-black bg-opacity-50 opacity-0 flex items-center justify-center'>
                                Delete
                            </button>
                            {/* object cover crops the image to prevent overflow */}
                        </div>
                    ))}
                </div>
            )}
            <input type='file' accept='image/*' multiple className='font-normal text-gray-700 w-full' {...register('imageFiles',{
                validate:(file)=>{
                    const x=existUrls?.length || 0;
                    if(x+file.length===0){
                        return "Atleast one image is required"
                    }
                    if(x+file.length>6){
                        return "Images cannot be more than 6 "
                    }
                    return true
                }
            })} ></input>
        </div>
        {errors.imageFiles && (
            <span className='text-red-500 font-bold text-sm'>
                {errors.imageFiles.message}
            </span>
        )}
    </div>
  )
}

export default Images