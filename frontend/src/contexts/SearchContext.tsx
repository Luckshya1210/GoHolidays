import React, { useContext, useState } from "react";
type SearchContextType={
    destination:string;
    checkIn:Date;
    checkOut:Date;
    adultCount:number;
    childCount:number;
    hotelId:string;
    saveSearchValues:(destination:string,checkIn:Date,checkOut:Date,adultCount:number,childCount:number)=>void
}
type SearchProps={
    children:React.ReactNode
}

const SearchContext=React.createContext<SearchContextType|undefined>(undefined)


export const SearchContextProvider=({children}:SearchProps)=>{
    const [destination,setdestination]=useState<string>(()=>sessionStorage.getItem("destination")|| "");
    const [hotelId,sethotelId]=useState<string>(()=> sessionStorage.getItem("hotelId") || "");
    const [checkIn,setcheckIn]=useState<Date>(()=> new Date(sessionStorage.getItem("checkIn")  || new Date().toISOString()));
    const [checkOut,setcheckOut]=useState<Date>(()=>  new Date(sessionStorage.getItem("checkOut")  || new Date().toISOString()));
    const [adultCount,setadultCount]=useState<number>( ()=>parseInt(sessionStorage.getItem("adultCount") || "1"));
    const [childCount,setchildCount]=useState<number>(()=>parseInt(sessionStorage.getItem("childCount") || "1"));
    const saveSearchValues=(destination:string,checkIn:Date,checkOut:Date,adultCount:number,childCount:number,hotelId?:string)=>{
        setdestination(destination);
        setcheckIn(checkIn);
        setcheckOut(checkOut);
        setadultCount(adultCount);
        setchildCount(childCount);
        if(hotelId){
            sethotelId(hotelId);
        }
        sessionStorage.setItem("destination", destination);
        sessionStorage.setItem("checkIn", checkIn.toISOString());
        sessionStorage.setItem("checkOut", checkOut.toISOString());
        sessionStorage.setItem("adultCount", adultCount.toString());
        sessionStorage.setItem("childCount", childCount.toString());

        if (hotelId) {
            sessionStorage.setItem("hotelId", hotelId);
        }
    }
    return (
        <SearchContext.Provider value={{destination,hotelId,checkIn,checkOut,adultCount,childCount,saveSearchValues}} >
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext=()=>{
    const searchContext=useContext(SearchContext);
    return searchContext as SearchContextType ;
}
