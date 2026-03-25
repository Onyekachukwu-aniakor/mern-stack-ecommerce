import React from 'react'
import { assets } from '../assets/assets'

const Hero = () => {
  return (
    <div className=' flex flex-col sm:flex-row border border-gray-400'>
        {/* Hero left side */}
        <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
            <div className='flex items-center gap-2'>
                <p className='w-8 md:w-11 h-1 bg-[#414141]'></p>
                <p className='font-medium md:text-base text-sm'>BEST SELLER PRODUCTS</p>
            </div>
            <h1 className='prata-regular text-3xl py-3 lg:text-5xl leading-relaxed'>New Arrivals</h1>
            <div className='flex items-center gap-2'>
                <p className='font-semibold text-sm md:text-base'>SHOP NOW</p>
                <p className='w-8 md:w-11 h-1 bg-[#414141]'></p>
            </div>
        </div>
        </div>
        {/*Hero Right side */}
        
            <img className='w-full sm:w-1/2  ' src={assets.myimage} alt=" hero image" />
        

    </div>
  )
}

export default Hero