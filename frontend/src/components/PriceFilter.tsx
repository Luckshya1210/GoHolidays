import React from 'react'
type Props={
    maxprice?:number;
    onChange:(maxp?:number)=>void
}
const PriceFilter = ({maxprice,onChange}:Props) => {
  return (
    <div>
        <h4 className='font-semibold mb-2 text-md'>Select max price</h4>
        <select className=' border p-2 w-full rounded-md ' value={maxprice} onChange={(e)=>onChange(e.target.value?parseInt(e.target.value):undefined)}  >
            <option value=''>Select a Max Price</option>
            {[50,100,200,300,500].map((price)=>(
                <option value={price}>
                    {price}
                </option>
            ))}
        </select>
    </div>
  )
}

export default PriceFilter