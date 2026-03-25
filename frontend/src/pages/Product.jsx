import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProducts from '../components/RelatedProducts';

const Product = () => {
  //we want to display the product in productDB with productId
  const {productId} = useParams();
  const {products, currency, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  //sizes used so as to indicate the size clicked.
  const [size, setSize] = useState('')

  const fetchProductData = async () => {
    products.map((item)=>{
      if(item._id === productId){
        setProductData(item);
        setImage(item.image[0])
        return null;
      }
    })
    
  };

  useEffect(()=> {
    fetchProductData();

  }, [productId]);
  
  return productData ?
  (
    <div className='border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* product Data */}
      <div className="flex gap-12 sm:gap-12 flex-col sm:flex-row ">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row ">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full ">
            {/* displays small side images */}
            {
              productData.image.map((item, index) => (
                //onClick below displays the small side image to bigger image on click
                <img  onClick={()=> setImage(item)} src={item} alt="image item" key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer rounded' />
              ))
            }
          </div>
          <div className="w-full sm:w-[80%] ">
            {/* displays bigger image */}
            <img src={image} alt="image" className='w-full h-auto rounded ' id='ok' />
          </div>
        </div>
        {/* Product details/information */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {/* display star icons below */}
            <img src={assets.star_icon} alt=" star icon" className='w-3.5' />
            <img src={assets.star_icon} alt="star icon" className='w-3.5' />
            <img src={assets.star_icon} alt="star icon" className='w-3.5' />
            <img src={assets.star_icon} alt="star icon" className='w-3.5' />
            <img src={assets.star_dull_icon} alt="star icon" className='w-3.5' />
            <p className='pl-2'>(122)</p>
          </div>
          <p className="mt-4 text-2xl font-medium">{currency}{productData.price}</p>
          <p className="mt-5 text-gray-500 md:w-4/5">{productData.description}</p>
          <div className="flex flex-col gap-4 my-8">
            <p className='text-2xl'>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item,index)=>(
                <button onClick={()=>setSize(item)} className={`border py-2 px-4 bg-gray-100 ${item === size ? 'border-blue-500' :''}`} key={index}>{item}</button>
              ))}
            </div>
          </div>
          <button
           className='bg-black text-white px-8 py-3 text-sm active:bg-gray-600 rounded'
           onClick={()=>addToCart(productData._id, size)}>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5'/>
          <div className="text-sm text-gray-500 mt-5 flex flex-col gap-1">
            <p>100% High Quality Product</p>
            <p>We Accept Cash On Delivery</p>
            <p>We Accept Returns And Exchange Products Within 14 Days Of Purchase</p>
          </div>
        </div>
      </div>
      {/* Description and Review section */}
      <div className="mt-20">
        <div className="flex">
          <b className='border px-5 py-3 text-sm rounded-l'>Description</b>
          <p className='border px-5 py-3 text-sm rounded-r'>Reviews(122)</p>
        </div>
        <div className="flex flex-col gap-4 border p-6 text-sm text-gray-500 rounded">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo doloribus perferendis ipsam, laborum illo pariatur unde atque minus minima molestias vitae at optio voluptatum corporis libero eaque, dolorem nihil. Ex.</p>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolorum enim illo eos sit culpa ullam nostrum cum, laboriosam dolor fugiat quas distinctio, modi deleniti est voluptatem similique aliquid delectus?</p>
        </div>
      </div>
      {/* Display Related Products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>) 
    : <div className="opacity-0"></div>
}

export default Product