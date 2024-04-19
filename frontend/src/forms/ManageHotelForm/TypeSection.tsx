import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options";
import { formData } from "./ManageHotelForm";


const TypeSection=()=>{
    const {register,watch,formState:{errors}}=useFormContext<formData>()
    const typewatch=watch("type")
    return (
        <div>
            <h2 className="text-2xl font-bold mb-3" >Type</h2>
            <div className="grid grid-cols-5 gap-2">
                {hotelTypes.map((v)=>(
                    <label className={typewatch===v?"rounded-full bg-blue-300 cursor-pointer px-4 py-2 font-semibold text-sm":"rounded-full bg-gray-300 cursor-pointer px-4 py-2 font-semibold text-sm"} >
                        <input type="radio" value={v} className="hidden" {...register("type",{required:"This field is required"})}/>
                        <span>{v}</span>
                    </label>
                ))}
            </div>
            {errors.type && 
              (  <span className="text-red-500 font-bold text-sm">
                    {errors.type.message}
                </span>)
            }

        </div>
    )
}

export default TypeSection
