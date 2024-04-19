import { RegisterFormData } from "./pages/Registerr";
import { SignIndata } from "./pages/SignInn";
import {HotelType} from '../../backend/src/models/hotel'
import {UserType} from '../../backend/src/models/user'
import {HotelSearchData, paymentIntentType} from '../../backend/src/routes/hotels'
import { formData } from "./forms/ManageHotelForm/ManageHotelForm";
import {BookingFormData} from './forms/BookingForm/BookingForm'
const API_BASE_URL=import.meta.env.VITE_API_BASE_URL || ''

export const register=async(formData:RegisterFormData)=>{
    const resp=await fetch(`${API_BASE_URL}/api/users/register`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
    })

    const resp_body=await resp.json();    //takes the body of response and converts it to json

    if(!resp.ok){
        throw new Error(resp_body.message)
    }


}

export const validate=async()=>{
    const res=await fetch(`${API_BASE_URL}/api/auth/validate-token`,{
        credentials:"include"
    })
    if(!res.ok){
        throw new Error("Token invalid")
    }
    return res.json();
}

export const signin=async(formData:SignIndata)=>{
    const response=await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    const res_body=await response.json();
    if(!response.ok){
        throw new Error(res_body.message)
    }
}
//api...req.headers..=>bearer token
export const googleAuth=async(cred:string)=>{
    const res=await fetch(`${API_BASE_URL}/api/auth/google-auth`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify({cred})
    })
    if(!res.ok){
        throw new Error("Unable to login via google");
    }
    
}
export const signout=async()=>{
    const res=await fetch(`${API_BASE_URL}/api/auth/logout`,{
        credentials:"include",
        method:"POST",
    })
    if(!res.ok){
        throw new Error("Error signing out")
    }
}

export const add_hotel=async(formdata:FormData)=>{
    const res=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"POST",
        credentials:"include",
        body:formdata,
    })
    if(!res.ok){
        throw new Error("Failed to add hotel")
    }
    return res.json();
}

export const fetchHotels=async():Promise<HotelType[]>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels`,{
        method:"GET",
        credentials:"include"
    })
    if(!response.ok){
        throw new Error("Error fetching hotels");
    }
    return response.json()
}

export const fetchById=async(hotelId:string):Promise<HotelType>=>{
    const resp=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelId}`,{
        method:"GET",
        credentials:"include"
    });
    if(!resp.ok){
        throw new Error("Error fetching")
    }
    return resp.json();
}

export const updateById=async(hotelData:FormData):Promise<HotelType>=>{
    const response=await fetch(`${API_BASE_URL}/api/my-hotels/${hotelData.get("hotelId")}`,{
        method:"PUT",
        body:hotelData,
        credentials:"include",
    })
    if(!response.ok){
        throw new Error("Failed to update hotel")
    }
    return response.json()
}

type SearchParams={
    destination?:string;
    checkIn?:string;
    checkOut?:string;
    adultCount?:string;
    childCount?:string;
    page?:string;
    facilities?:string[];
    types?:string[];
    stars?:string[];
    maxPrice?:string;
    sortOption?:string
}

export const searchHotels=async(searchParams:SearchParams):Promise<HotelSearchData>=>{
    const search_urlq=new URLSearchParams();
    search_urlq.append("destination",(searchParams.destination || ""));
    search_urlq.append("adultCount",searchParams.adultCount || "");
    search_urlq.append("childCount",searchParams.childCount || "");
    search_urlq.append("checkIn",searchParams.checkIn || "");
    search_urlq.append("checkOut",searchParams.checkOut || "");
    search_urlq.append("page",searchParams.page || "");

    search_urlq.append("maxPrice",searchParams.maxPrice || "")
    search_urlq.append("sortOption",searchParams.sortOption || "")

    searchParams.facilities?.forEach((facility)=>search_urlq.append("facilities",facility))
    searchParams.types?.forEach((type)=>search_urlq.append("types",type))
    searchParams.stars?.forEach((star)=>search_urlq.append("stars",star))


    const response=await fetch(`${API_BASE_URL}/api/hotels/search?${search_urlq}`);

    if(!response.ok){
        throw new Error("Something went wrong")
    }

    return response.json();

}

export const fetchByHotelId=async(hotelId:string):Promise<HotelType>=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`);
    if(!response.ok){
        throw new Error("Error fetching hotel");
    }
    return response.json();
}

export const fetchUserById=async():Promise<UserType>=>{
    const response=await fetch(`${API_BASE_URL}/api/users/me`,{credentials:"include"});
    if(!response.ok){
        throw new Error("Error fetching user")
    }
    return response.json();
}

export const createPaymentIntent=async(hotelId:string,noofNights:string):Promise<paymentIntentType>=>{
    const response=await fetch(`${API_BASE_URL}/api/hotels/${hotelId}/bookings/payment-intent`,{
        headers:{
            "Content-type":"application/json"
        },
        credentials:"include",
        method:"POST",
        body:JSON.stringify({noofNights})
    });
    if(!response.ok){
        throw new Error("Error creating payment intent")
    }

    return response.json();

}

export const createBooking=async(formData:BookingFormData)=>{
    const res=await fetch(`${API_BASE_URL}/api/hotels/${formData.hotelId}/bookings`,{
        method:"POST",
        credentials:"include",
        headers:{
            "Content-type":"application/json"
        },
        body:JSON.stringify(formData)
    })
    if(!res.ok){
        throw new Error("Error booking room")
    }
    return res.json()
}

export const fetchMyBookings=async()=>{
    const res=await fetch(`${API_BASE_URL}/api/my-bookings`,{
        method:"GET",
        credentials:"include"
    })
    if(!res.ok){
        throw new Error("Error fetching your bookings");
    }
    return res.json();
}

export const fetchAllHotels=async()=>{
    const res=await fetch(`${API_BASE_URL}/api/hotels/`);
    if(!res.ok){
        throw new Error("Something went Wrong here")
    }
    return res.json();
} 

export const deliverMail=async(email:string)=>{
    const res=await fetch(`${API_BASE_URL}/api/users/booking`,{
        headers:{
            "Content-type":"application/json"
        },
        method:"POST",
        body:JSON.stringify({email})
    });

    if(!res.ok){
        throw new Error("Error sending mail");
    }
    return res.json();

}