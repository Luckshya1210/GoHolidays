import React, { useState } from 'react'
import { useSearchContext } from '../contexts/SearchContext'
import { useQuery } from 'react-query';
import * as apiClient from '../api-client'
import SearchResultCard from '../components/SearchResultCard';
import Pagination from '../components/Pagination';
import StarRating from '../components/StarRating';
import HotelTypesFilter from '../components/HotelTypesFilter';
import FacilityFilter from '../components/FacilityFilter';
import PriceFilter from '../components/PriceFilter';
const Search = () => {
    const search=useSearchContext();
    const [page,setpage]=useState<number>(1);
    const [selectedStars,setselectedStars]=useState<string[]>([])
    const [selectedHotelTypes,setselectedHotelTypes]=useState<string[]>([])
    const [sortOption,setsortOption]=useState<string>("");
    const [selectedfacilities,setselectedfacility]=useState<string[]>([])
    const [maxprice,setmaxprice]=useState<number|undefined>()
    const handlestarchange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const starRating=event.target.value;
        setselectedStars((prevStars)=>(
            event.target.checked?[...prevStars,starRating]:
            prevStars.filter((s)=>s!==starRating)
        ));
    }
    const handleHotelTypeChange=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const selectedHotelType=event.target.value;
        setselectedHotelTypes((prevtype)=>(
            event.target.checked?[...prevtype,selectedHotelType]:
            prevtype.filter((s)=>s!==selectedHotelType)
        ));
    }
    const handleselectedfacility=(event:React.ChangeEvent<HTMLInputElement>)=>{
        const selectedfacility=event.target.value;
        setselectedfacility((prevtype)=>(
            event.target.checked?[...prevtype,selectedfacility]:
            prevtype.filter((s)=>s!==selectedfacility)
        ));
    }
    const searchparams={
        destination:search.destination,
        checkIn:search.checkIn.toISOString(),
        checkOut:search.checkOut.toISOString(),
        adultCount:search.adultCount.toString(),
        childCount:search.childCount.toString(),
        page:page.toString(),
        stars:selectedStars,
        types:selectedHotelTypes,
        facilities:selectedfacilities,
        maxPrice:maxprice?.toString(),
        sortOption:sortOption
    };
    const {data:hotelsData}=useQuery(["searchQuery",searchparams],()=>apiClient.searchHotels(searchparams));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-5">
        <div className="rounded-lg border border-slate-300 p-5 h-fit">
           <div className='space-y-5'>
                <h3 className='text-lg font-semibold border-b pb-5 border-slate-300'>
                    Filter By:
                </h3>
                <StarRating selectedStars={selectedStars} onChange={handlestarchange} />
                <HotelTypesFilter selectedHotelTypes={selectedHotelTypes} onChange={handleHotelTypeChange}/>
                <FacilityFilter selectedfacilities={selectedfacilities} onChange={handleselectedfacility}/>
                <PriceFilter maxprice={maxprice} onChange={(p?:number)=>setmaxprice(p)} />
            </div>
        </div>
        <div className='flex flex-col gap-5'>
            <div className='flex justify-between items-center'>
                <span className='text-xl font-bold'>
                    {hotelsData?.pagination.total} Hotels found
                    {search.destination? ` in ${search.destination}`:""}

                </span>
                <select value={sortOption} onChange={(e)=>setsortOption(e.target.value)} className='p-2 border rounded-md' >
                    <option value="" >Sort By</option>
                    <option value="starRating">Ratings</option>
                    <option value="pricePerNightAsc">Prices Per Night (low to high)</option>
                    <option value="pricePerNightDesc">Prices Per Night (high to low)</option>
                </select>
            </div>
            {hotelsData?.data.map((hotel)=>(
                <SearchResultCard hotel={hotel}/>
            ))}
            <Pagination pages={hotelsData?.pagination.pages || 1} page={page} onChange={(p)=>setpage(p)} />
        </div>
    </div>
  )
}

export default Search