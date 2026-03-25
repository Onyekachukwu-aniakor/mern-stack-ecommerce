import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const Contact = () => {
  return (
    <div>
      <div className="text-2xl pt-10 text-center border-t">
        <Title text1={'CONTACT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-28">
        <img src={assets.contact_img} alt="contact image" className='w-full md:max-w-[480px] rounded' />
        <div className="items-start flex flex-col justify-center  gap-6 ">
          <b className='text-xl text-gray-600'> Our Store</b>
          <p className='text-xl text-gray-500'>214 High Street, <br />Pensnet Road, <br /> Brierley Hill.</p>
          <p className='text-xl text-gray-500'>Tel: +447526000296 <br />Email:aniakor@gmail.com</p>
          <p className='text-xl text-gray-600'><span className='font-semibold'>Learn More About Us:</span> <br />Lorem ipsum dolor sit, amet consectetur adipisicing elit. Aperiam veritatis labore illo totam placeat aliquam ullam. Quo assumenda ducimus dolore natus totam ipsa reprehenderit, iste id. Amet, mollitia. Unde, magni!</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default Contact