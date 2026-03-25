import React from 'react'
import {assets} from '../assets/assets'


//destructure 'setToken' from app.jsx, used to activate Logout button below
const Navbar = ({setToken}) => {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
        <h2 className='w-38 font-bold italic uppercase cursor-pointer mb-5'>Aniakor</h2>
        <button 
        className='px-5 bg-gray-600 text-white py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'
        onClick={()=>setToken('')}>Logout</button>
    </div>
  )
}

export default Navbar