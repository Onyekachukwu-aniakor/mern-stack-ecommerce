import React from 'react'

const Title = ({text1, text2}) => {
  return (
    <div className='inline-flex items-center gap-2 mb-3'>
        <p className='text-gray-500  '>
            {text1}

            <span className='text-gray-700 font-bold  '>  {text2}</span>
        </p>
        <p className='w-8 sm:w-11 h-1 bg-gray-700 sm:h-1'></p>
    </div>
  )
}

export default Title