import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetterBox from '../components/NewsLetterBox'

const About = () => {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t ">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      {/* LEFT SIDE */}
      <div className="mt-10 flex flex-col md:flex-row gap-16">
        <img src={assets.about_img} alt="about image" className='w-full md:max-w-[450px]' />
        {/* right side with text/write up */}
        <div className="flex flex-col justify-center gap-6  md:w-2/4 text-gray-600">

        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corrupti aperiam dicta ipsam consequatur reprehenderit. Saepe consequatur quasi omnis dicta, debitis velit officia nobis rem voluptatem vero, similique laborum quo nemo?
        Ducimus exercitationem fugit quia? Amet delectus reprehenderit minima dolore ipsam tenetur veritatis cupiditate porro at? Ea, quas suscipit. Est ducimus commodi harum ab unde, possimus doloribus eos veniam sed animi.</p>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae, possimus veritatis natus accusantium excepturi necessitatibus aut beatae fuga molestiae, maiores non quibusdam ad veniam odio eum explicabo aliquid ipsum delectus?
        Molestiae cumque mollitia ipsum dolore deserunt architecto nam excepturi officiis voluptate tempore, exercitationem blanditiis, dolor perferendis similique aspernatur nesciunt, odit eos id est accusamus tempora sapiente soluta fuga. Doloribus, architecto.
        Sunt exercitationem sint ratione? Expedita commodi saepe veniam accusamus! Veritatis minima, iste placeat necessitatibus eum, voluptatum ab saepe temporibus recusandae sint laboriosam ex omnis quis quaerat nobis voluptatibus consectetur? Alias?</p>
        <b className='text-gray-800'>Our Mission</b>
        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ad minus voluptatum vitae magnam a aperiam laborum, ipsa accusamus laboriosam hic veritatis, repellat quam excepturi commodi quidem voluptates obcaecati officiis cum.</p>

        </div>
      </div>
      <div className="text-1xl py-4">
        <Title text1={'WHY'}  text2={'CHOOSE US'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Quality Assurance:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui temporibus nemo saepe atque voluptatem maxime molestias. Ut exercitationem ullam, harum alias, a quisquam doloribus voluptatum quaerat accusantium fugit illum aliquid!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Convenience:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui temporibus nemo saepe atque voluptatem maxime molestias. Ut exercitationem ullam, harum alias, a quisquam doloribus voluptatum quaerat accusantium fugit illum aliquid!</p>
        </div>
        <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Good Customer Service:</b>
          <p className='text-gray-600'>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Qui temporibus nemo saepe atque voluptatem maxime molestias. Ut exercitationem ullam, harum alias, a quisquam doloribus voluptatum quaerat accusantium fugit illum aliquid!</p>
        </div>
      </div>
      <NewsLetterBox/>
    </div>
  )
}

export default About