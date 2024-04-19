import React from 'react'
type Props={
    selectedStars:string[];
    onChange:(event:React.ChangeEvent<HTMLInputElement>)=>void
}
const StarRating = ({selectedStars,onChange}:Props) => {
  return (
    <div className='pb-5 border-b border-slate-300'>
        <h3 className='font-semibold text-md mb-2' >Property Rating</h3>
        {["5","4","3","2","1"].map((star)=>(
            <label className='flex space-x-2 items-center '>
                <input className='rounded' type='checkbox' checked={selectedStars.includes(star)} onChange={onChange} value={star} />
                <span className=''>{star} stars</span>
            </label>
        ))}
    </div>
  )
}

export default StarRating