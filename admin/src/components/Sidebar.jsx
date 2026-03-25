import React from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets'

const Sidebar = () => {
  return (
    <div className='w-[20%] min-h-screen border-r-2'>
        <div className="flex flex-col gap-4 pt-6 pl-[20%] text-[11px]">
            <NavLink to='/add'  className='hover:bg-blue-400 flex items-center gap-3 border bg-slate-100 border-gray-300 border-r-0 px-3 py-2 rounded-full'>
            <img src={assets.add_icon} alt="add icon" className='w-5 h-5' />
            <p className='hidden md:block'>Add Products</p>

            </NavLink>
            <NavLink to='/list'  className='flex items-center gap-3 border hover:bg-blue-400 bg-slate-100 border-gray-300 border-r-0 px-3 py-2 rounded-full'>
            <img src={assets.order_icon} alt="order icon" className='w-5 h-5' />
            <p className='hidden md:block'>List Products</p>

            </NavLink>
            <NavLink to='/orders'  className='hover:bg-blue-400 flex items-center gap-3 border bg-slate-100 border-gray-300 border-r-0 px-3 py-2 rounded-full'>
            <img src={assets.order_icon} alt="order icon" className='w-5 h-5' />
            <p className='hidden md:block'>Orders</p>

            </NavLink>
        </div>
    </div>
  )
}

export default Sidebar