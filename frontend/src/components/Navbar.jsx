import React, { useContext, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {assets} from '../assets/assets'
import { ShopContext } from '../context/ShopContext'

const Navbar = () => {
  const [visible, setVisible] = useState(false)
  const {setShowSearch, getCartCount, navigate, token, setToken, setCartItems} = useContext(ShopContext);

  const logout = () =>{
    navigate('/login')
    //remove token from loca storage
    localStorage.removeItem('token');
    // set below empty when you logout
    setToken('')
    setCartItems({})
    
  }
  return (
    <div className='flex items-center justify-between py-5 font-medium  '>
       <Link to='/'>
        <h2 className=' w-38 font-bold italic uppercase cursor-pointer '>aniakor</h2></Link>
        <ul className='hidden sm:flex gap-5 text-sm text-gray-700'>
          <NavLink to='/' className='flex flex-col items-center gap-1 '>
            <p className='block px-2 rounded text-center py-1 text-sm  hover:bg-blue-400 '>HOME</p>  
          </NavLink>
          <NavLink to='/collection' className='flex flex-col items-center gap-1 '>
            <p className='block px-2 rounded text-center py-1 text-sm  hover:bg-blue-400 '>COLLECTION</p>  
          </NavLink>
          <NavLink to='/about' className='flex flex-col items-center gap-1 '>
            <p className='block   px-2 rounded text-center py-1 text-sm hover:bg-blue-400 '>ABOUT</p>  
          </NavLink>
          <NavLink to='/contact' className='flex flex-col items-center gap-1 '>
            <p className='block bg-black px-2 rounded text-center py-1 text-sm text-white hover:bg-blue-400 '>CONTACT</p>  
          </NavLink>
        </ul>
        <div className='flex items-center gap-6'>
          <img onClick={()=>setShowSearch(true)} src={assets.search_icon} className='w-5 cursor-pointer' alt="search icon" />
          <div className='group relative'>
            {/* onClick={()=>token ? null : navigate('/login') when ur in homepage, a click at profile icon takes you to login page */}
            <img onClick={()=>token ? null : navigate('/login')}
            src={assets.profile_icon} className='w-5' alt="profile icon" />
            {/* Dropdown Menu  */}
            {/* '{dropdown}' means u can only see dropdown icon when you login */}
          { token && 
          <div className='group-hover:block hidden absolute dropdown-menu right-0 pt-4'>
              <div className='flex flex-col gap-2 w-36 py-3 px-5 bg-slate-200 text-gray-500 rounded'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p className='cursor-pointer hover:text-black'
                onClick={logout}>Logout</p>
              </div>
            </div>}
          </div>
          <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} className='w-5 min-w-5' alt="cart icon" />
          <p className='absolute -top-5 w-4 text-center -right-2 leading-4 bg-black text-white rounded aspect-square text-xs '>{getCartCount()}</p>
          </Link>
          <img onClick={()=>setVisible(true)} src={assets.menu_icon} className='w-5 cursor-pointer sm:hidden' alt="meni icon" />
        </div>
        {/* Sidebar menu for small screen */}
        <div className={`absolute right-0 top-0 overflow-hidden bottom-0 bg-white transition-all ${visible ? 'w-full' : 'w-0'}`}>
          <div className='flex flex-col text-gray-600'>
            {/* with this ONCLICK below, it returns the menu back to default */}
            <div onClick={()=> setVisible(false)} className='flex items-center gap-4 p-3'>
              
              <img src={assets.dropdown_icon} alt="dropdown icon" className='h-4 rotate-180 cursor-pointer' />
              <p className='cursor-pointer'>Back</p>
            </div>
            <NavLink onClick={()=>setVisible(false)} to='/' className='flex border flex-col items-center gap-1 '>
            <p className='block px-2 rounded  text-center py-1 text-sm  hover:bg-blue-400 '>HOME</p>  
          </NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/collection' className='flex border flex-col items-center gap-1 '>
            <p className='block px-2  rounded text-center py-1 text-sm  hover:bg-blue-400 '>COLLECTION</p>  
          </NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/about' className='border flex flex-col items-center gap-1 '>
            <p className='block    px-2 rounded text-center py-1 text-sm hover:bg-blue-400 '>ABOUT</p>  
          </NavLink>
          <NavLink onClick={()=>setVisible(false)} to='/contact' className='border flex flex-col items-center gap-1 '>
            <p className='block  bg-black px-2 rounded text-center py-1 text-sm text-white hover:bg-blue-400 '>CONTACT</p>  
          </NavLink>
          </div>
        </div>
    </div>
  )
}

export default Navbar