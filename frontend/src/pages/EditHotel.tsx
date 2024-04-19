import React from 'react'
import ManageHotelForm from '../forms/ManageHotelForm/ManageHotelForm'
import * as apiClient from '../api-client'
 
import { useMutation, useQuery } from 'react-query'
import { useNavigate, useParams } from 'react-router-dom'
import { useAppContext } from '../contexts/AppContext'
import toast from 'react-hot-toast'
const EditHotel = () => {
    const {hotelId}=useParams();
    const {data:h}=useQuery("fetchById",()=>apiClient.fetchById(hotelId||''),{
        enabled:!!hotelId
    })
    const {showToast}=useAppContext()
    const navigate=useNavigate();
    const mutation=useMutation(apiClient.updateById,{
        onSuccess:()=>{
            // showToast({message:"Hotel saved succesfully",type:"SUCCESS"})
            toast.success('Hotel saved succesfully')
            navigate('/my-hotels')
        },
        onError:()=>{
            toast.error("Error saving hotel")
            // showToast({message:"Error saving hotel",type:"ERROR"})
        }
    });
    const handleSave=(formdata:FormData)=>{
        mutation.mutate(formdata);
    }
  return (
    <div>
        <ManageHotelForm hotel={h}  onSave={handleSave} isLoading={mutation.isLoading} />
    </div>
  )
}

export default EditHotel