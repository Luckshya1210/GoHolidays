import { useMutation } from "react-query"
import ManageHotelForm from "../forms/ManageHotelForm/ManageHotelForm"
import { useAppContext } from "../contexts/AppContext"
import * as apiClient from '../api-client'
import { useNavigate } from "react-router-dom"
import toast from "react-hot-toast"
const AddHotel=()=>{
    const {showToast}=useAppContext()
    const navigate=useNavigate();
    const {mutate,isLoading}=useMutation(apiClient.add_hotel,{
        onSuccess:()=>{
            // showToast({message:"Hotel saved succesfully",type:"SUCCESS"})
            
            toast.success('Hotel saved succesfully')
            
            navigate('/my-hotels')
        },
        onError:()=>{
            toast.error('Error saving hotel')
        
            // showToast({message:"Error saving hotel",type:"ERROR"})
        }
    })
    const handlesave=(formdata:FormData)=>{
        mutate(formdata)
    }
    return (
        <ManageHotelForm onSave={handlesave} isLoading={isLoading} />
    )

}
export default AddHotel