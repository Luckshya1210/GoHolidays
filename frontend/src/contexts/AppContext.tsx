import React, { useContext, useState } from "react";
import Toast from "../components/Toast";
import {Stripe,loadStripe} from '@stripe/stripe-js'
import { useQuery } from "react-query";
import * as apiClient from '../api-client'
const STRIPE_PUB_KEY=import.meta.env.VITE_STRIPE_PUB_KEY || ""
type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR";
}
type AppContext={
    showToast:(toastMessage:ToastMessage)=>void;
    isLoggedIn:boolean;
    stripePromise:Promise<Stripe|null>
}


const AppContext=React.createContext<AppContext|undefined>(undefined);

const stripePromise=loadStripe(STRIPE_PUB_KEY)

//provider wraps all the componenets and gives acces to all the contexts

export const AppContextProvider=({children}:{children:React.ReactNode})=>{
    const [toast,setToast]=useState<ToastMessage|undefined>(undefined);
    const {isError}=useQuery("validateToken",apiClient.validate,{retry:false});
    return(
        <AppContext.Provider value={{showToast:(toast_mess)=>{setToast(toast_mess)},isLoggedIn:!isError,stripePromise }} >
            {toast && <Toast message={toast.message} type={toast.type} onClose={()=>setToast(undefined)} />}
            {children}
            
        </AppContext.Provider>
    )
}

export const useAppContext=()=>{
    const context=useContext(AppContext)
    return context as AppContext
}