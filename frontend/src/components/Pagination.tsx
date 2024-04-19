import React from 'react'
type Props={
    pages:number;
    page:number;
    onChange:(page:number)=>void
}
const Pagination = ({pages,page,onChange}:Props) => {
    const pageArr=[]
    for(let i=1;i<=pages;i++){
        pageArr.push(i);
    }

  return (
    <div className='flex justify-center'>
        <ul  className='border border-slate-500  flex' >
            {pageArr.map((pge)=>( 
                <li className={`${pge===page ?'bg-gray-300':''} w-full h-full px-2 py-1`}>
                    <button onClick={()=>onChange(pge)} >
                        {pge}
                    </button>
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Pagination