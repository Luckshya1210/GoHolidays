import  { useEffect } from 'react'
import { FormProvider, useForm } from 'react-hook-form';
import DetailsSection from './DetailsSection';
import TypeSection from './TypeSection';
import Facilities from './Facilities';
import Guest from './Guest';
import Images from './Images';
import { HotelType } from '../../../../backend/src/models/hotel';
type Props={
    onSave:(formdata:FormData)=>void;
    isLoading:boolean;
    hotel?:HotelType
}

export type formData={ 
    name:string;
    city:string;
    country:string;
    description:string;
    type:string;
    adultCount:number;
    childCount:number;
    facilities:string[];
    pricePerNight:number;
    imageUrls:string[];
    starRating:number;
    imageFiles:FileList; 
}
const ManageHotelForm = ({onSave,isLoading,hotel}:Props) => {
    const formMethods=useForm<formData>();
    const {handleSubmit,reset}=formMethods;
    useEffect(()=>{
        reset(hotel);
    },[hotel,reset])
    const onSubmit=handleSubmit((formDataJson:formData)=>{
       const formdata=new FormData();
       if(hotel){
        formdata.append("hotelId",hotel._id);
       }
       formdata.append("name", formDataJson.name);
       formdata.append("city", formDataJson.city);
       formdata.append("country", formDataJson.country);
       formdata.append("description", formDataJson.description);
       formdata.append("type", formDataJson.type);
       formdata.append("pricePerNight", formDataJson.pricePerNight.toString());
       formdata.append("starRating", formDataJson.starRating.toString());
       formdata.append("adultCount", formDataJson.adultCount.toString());
       formdata.append("childCount", formDataJson.childCount.toString());
   
       formDataJson.facilities.forEach((facility, index) => {
        formdata.append(`facilities[${index}]`, facility);
       });
   
       if(formDataJson.imageUrls){
        formDataJson.imageUrls.forEach((url,index) => {
            formdata.append(`imageUrls[${index}]`,url)
        });
       }
     
       Array.from(formDataJson.imageFiles).forEach((imageFile) => {
        formdata.append(`imageFiles`, imageFile);
       });

       onSave(formdata)

    //    console.log(formdata);
   
    })
  return (
      <FormProvider {...formMethods}>
                <div >
                <form className='flex flex-col gap-10' onSubmit={onSubmit}>
                    <DetailsSection/>
                    <TypeSection/>
                    <Facilities/>
                    <Guest/>
                    <Images/>
                    <span className='flex justify-end'>
                        <button disabled={isLoading} type='submit' className='bg-blue-600 border rounded-l text-white disabled:bg-gray-500 px-5 py-3 font-bold hover:bg-blue-800 text-xl' >
                            {isLoading?"Saving...":"Save"}
                            {/* Save */}
                        </button>
                    </span>
                </form>
                </div>
            </FormProvider>
  )
}

export default ManageHotelForm