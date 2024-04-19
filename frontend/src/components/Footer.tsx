import React from 'react'

const Footer = () => {
  return (
    <div className='bg-blue-800 py-5 items-center' >
        <div className='container mx-auto flex items-center justify-between'>
            <span className='tracking-tight text-white font-bold text-3xl' >GoHolidays</span>
            <span className='text-white font-bold   gap-4 tracking-tight flex'>

                <p className='cursor-pointer'>Terms</p>
                <p className='cursor-pointer'>Privacy</p>
            </span>
        </div>    
    </div>
  )
}

export default Footer