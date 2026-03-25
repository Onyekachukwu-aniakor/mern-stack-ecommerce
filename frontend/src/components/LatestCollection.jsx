import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';


const LatestCollection = () => {
    const {products} = useContext(ShopContext);
    const [latestProducts, setLatestProducts] = useState([]);
    useEffect(()=>{
      //slice(0,10) bcos we want to load only 10 products
        setLatestProducts(products.slice(0,10));

    },[products]);
  return (
    <div className='my-10'>
        <div className=' text-center py-8 text-3xl'>
        <Title text1={'LATEST'} text2={'COLLECTIONS'}/>
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-600'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab repellat corrupti voluptate quae voluptates quasi qui ut expedita facere nihil velit dolores nisi praesentium, recusandae alias perferendis reiciendis! Autem, rem!
        Culpa, quisquam sapiente cupiditate eligendi amet temporibus facilis. Ducimus perspiciatis aut dolor non laborum dignissimos assumenda quod explicabo, culpa incidunt odit magni, sint facere debitis optio ab nobis ipsum beatae!
        Minima eum odio sint tempora, repellat pariatur aspernatur error enim, eius deleniti, ab ipsum illo ad maxime. Molestiae animi delectus accusamus minus hic voluptatibus, ipsa praesentium debitis. Delectus, odit iusto!</p>
        </div>
        {/* Rendering Products */}
        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-5'>
          {
            latestProducts.map((item, index)=>(
              <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>

            ))
          }
        </div>
        
    </div>
  )
}

export default LatestCollection