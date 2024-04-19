import React from 'react'
import * as apiClient from '../api-client'
import { useQuery } from 'react-query'
import LatestDestinationCard from '../components/LatestDestinationCard';
const Home = () => {
    const {data:hotels}=useQuery("fetchAllhotels",()=>apiClient.fetchAllHotels());
    if(!hotels){
        return (
            <div className='text-3xl font-bold'>
                No hotel available right now
            </div>
        )
    }
    const toprowhotel=hotels.slice(0,2) || [];  
    const bottom=hotels.slice(2) || [];
  return (
    <div className='space-y-3'>
        <h2 className='text-3xl font-bold'>Latest Destinations</h2>
        <p className='font-light text-xl' >Most recent destinations added recently by our hosts</p>
        <div className='grid gap-4'>
            <div className='grid md:grid-cols-2 grid-cols-1 gap-4'>
                {toprowhotel.map((hotel)=>(
                    <LatestDestinationCard hotel={hotel}/>
                ))}
            </div>
            <div className='grid md:grid-cols-3 gap-4'>
                {bottom.map((hotel)=>(
                    <LatestDestinationCard hotel={hotel}/>
                ))}
            </div>
        </div>
    </div>
  )
}

export default Home