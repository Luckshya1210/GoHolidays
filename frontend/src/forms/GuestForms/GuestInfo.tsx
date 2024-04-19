import { useForm } from 'react-hook-form';
import DatePicker from 'react-datepicker'
import { useSearchContext } from '../../contexts/SearchContext';
import { useAppContext } from '../../contexts/AppContext';
import { useLocation, useNavigate } from 'react-router-dom';
type Props={
    hotelId:string;
    pricePerNight:number;
}
type GuestInfoForm={
    checkIn:Date;
    checkOut:Date;
    childCount:number;
    adultCount:number;
}
const GuestInfo = ({hotelId,pricePerNight}:Props) => {
    const search=useSearchContext();
    const {isLoggedIn}=useAppContext()
    const {watch,register,handleSubmit,setValue,formState:{errors}}=useForm<GuestInfoForm>({defaultValues:{
        checkIn:search.checkIn,
        checkOut:search.checkOut,
        adultCount:search.adultCount,
        childCount:search.childCount
    }});
    const location=useLocation()
    const navigate=useNavigate()
    const onSigninClick=(data:GuestInfoForm)=>{
        search.saveSearchValues("",data.checkIn,data.checkOut,data.adultCount,data.childCount);
        navigate("/signin",{state:{from:location}})
    }
    const onSubmitClick=(data:GuestInfoForm)=>{
        search.saveSearchValues("",data.checkIn,data.checkOut,data.adultCount,data.childCount);
        navigate(`/hotel/${hotelId}/booking`,{state:{from:location}})
    }
    const checkIn=watch("checkIn")
    const checkOut=watch("checkOut")
    const minDate=new Date()
    const maxDate=new Date()
    maxDate.setFullYear(maxDate.getFullYear()+1)
    return (
    <div className='flex flex-col rounded-xl bg-blue-200 gap-4 p-4'>
        <h3 className='font-bold text-md'>Price per night : ${pricePerNight} </h3>
        <form onSubmit={isLoggedIn?handleSubmit(onSubmitClick):handleSubmit(onSigninClick)}>
            <div className='grid grid-cols-1 gap-4 items-center'>
                <div className='p-2 bg-white w-full '>
                    <DatePicker required selected={checkIn} wrapperClassName='min-w-full' placeholderText='Check In date' className='min-w-full bg-white p-2 focus:outline-none' minDate={minDate} maxDate={maxDate} selectsStart startDate={checkIn} endDate={checkOut} onChange={(date)=>setValue("checkIn",date as Date)}/>
                </div>
                <div className='p-2 bg-white w-full '>
                    <DatePicker required selected={checkOut} wrapperClassName='min-w-full' placeholderText='Check Out date' className='min-w-full bg-white p-2 focus:outline-none' minDate={minDate} maxDate={maxDate} selectsStart startDate={checkIn} endDate={checkOut} onChange={(date)=>setValue("checkOut",date as Date)}/>
                </div>
                <div className='flex justify-between bg-white px-3 py-3 gap-2 items-center rounded-full w-full'  >
                    <label className='flex items-center'>
                        Adults:
                        <input className='focus:outline-none  w-full p-1 font-bold' min={1} max={20} {...register("adultCount",{required:"This field is required",min:{value:1,message:"There must be alteast 1 adults"},valueAsNumber:true})}   type='number' />
                    </label>
                    <label className='flex  items-center'>
                        Children:
                        <input className='focus:outline-none w-full p-1 font-bold' min={0} max={20} {...register("childCount",{valueAsNumber:true})}  type='number' />
                    </label>
                    {errors.adultCount && (
                        <span className='text-red-500 font-semibold text-sm'>
                            {errors.adultCount.message}
                        </span>
                    )}
                </div>
                {isLoggedIn ? (
                    <button className='bg-blue-600 rounded-xl text-white h-full p-2 font-bold hover:bg-blue-800 text-xl'>
                        Book Now
                    </button>
                ):(
                    <button className='bg-blue-600 text-white rounded-xl h-full p-2 font-bold hover:bg-blue-800 text-xl'>Sign In to Book</button>
                )}
            </div>
        </form>
    </div>
  )
}

export default GuestInfo