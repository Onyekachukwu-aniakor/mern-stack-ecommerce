import React from 'react'
import { NavLink } from 'react-router-dom'


const Footer = () => {
  return (
    <div>
      <div className='flex  flex-col sm:grid grid-cols-[2fr_1fr_1fr] gap-12 my-10 mx-5 text-sm'>
        <div>
         <NavLink to='/'> <h2 className=' w-38 font-bold italic uppercase cursor-pointer mb-5  '>aniakor</h2></NavLink>
          <p className='w-full md-w-2/3 text-gray-600'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et officia quod veritatis sunt excepturi ullam ut exercitationem id, nulla necessitatibus.</p>
        </div>
        <div>
          <NavLink to='/'><p className='w-38 font-bold italic uppercase cursor-pointer mb-5'>company</p></NavLink>
          <ul className='flex flex-col gap-1 text-gray-600'>
           <NavLink className='cursor-pointer' to='/'> <li>Home</li></NavLink>
            <NavLink className='cursor-pointer' to='/about'> <li>About Us</li></NavLink>
            <NavLink className='cursor-pointer' to='/collection'> <li>Collection</li></NavLink>
            <li>Privacy Policy</li>

          </ul>
        </div>
        <div>
          <NavLink to='/contact'><p className='w-38 font-bold italic uppercase cursor-pointer mb-5'>GET IN TOUCH</p></NavLink>
          <ul className='flex flex-col gap-1 text-gray-600'>
            <li>+447526000296</li>
            <li>aniakor@gmail.com</li>
          </ul>
        </div>

      </div>
      <div>
        <hr />
        <p className='py-5 text-sm text-center'>&lt;&lt;&copy; 2026, Aniakor. All Rights Reserved&gt;&gt; </p>
      </div>
    </div>
  )
}

export default Footer