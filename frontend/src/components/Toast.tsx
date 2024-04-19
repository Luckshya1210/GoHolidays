import { useEffect } from "react";

type ToastMessage={
    message:string;
    type:"SUCCESS"|"ERROR";
    onClose:()=>void;
};

const Toast=({message,type,onClose}:ToastMessage)=>{
    useEffect(()=>{
        const timer=setTimeout(() => {
            onClose()
        }, 5000);
        return (()=>{clearTimeout(timer)})
        
    },[onClose])
    const styles=type==="SUCCESS"?"text-white bg-green-600 top-4 right-4 z-50 p-4 rounded-md max-w-md fixed":"fixed max-w-md text-white bg-red-400 top-4 right-4 z-50 p-4 rounded-md";
    return (
        <div className={styles}>
            <div className="flex justify-center align-items">
                <span className="text-lg font-semibold ">
                    {message}
                </span>
            </div>
        </div>
    )
}

export default Toast