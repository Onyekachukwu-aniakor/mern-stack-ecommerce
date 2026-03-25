import React from 'react'

const NewsLetterBox = () => {
    const onSubmitHandler =(e)=>{
        e.preventDefault();

    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-700'>Subscribe now & get 40% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, unde. Ea, voluptate. Perspiciatis soluta est officia autem totam voluptatum voluptates cum! Rem, ut aspernatur! Provident ratione voluptates doloribus eveniet quibusdam.
        </p>
        <form onSubmit={onSubmitHandler} className='flex items-center gap-3 mx-auto my-6 w-full sm:w-1/2  border pl-3 rounded-l-md' >
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required />
            <button className='bg-black text-white text-xs px-10 py-4 rounded-r-md border-1' type='submit'> SUBSCRIBE</button>
        </form>

    </div>
  )
}

export default NewsLetterBox