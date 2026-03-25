import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import {backendUrl} from '../App'
import { toast } from 'react-toastify'

const Add = ({token}) => {

  // create state variables to store the images

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men');
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestSeller, setBestSeller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      // formData to be added in the body when we add API call, also images
      //formData.append('name', name). NAME without STRING is from the USESATE, other NAME is FIELDNAME etc
      //JSON.stringify(sizes). becos you cannot put arrays ie(sizes is in arrays), to formData. you need to convert it to string first. thus JSON.stringify
      const formData = new FormData();

      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestSeller', bestSeller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1)
      image2 && formData.append('image2', image2)
      image3 && formData.append('image3', image3)
      image4 && formData.append('image4', image4)

      const response = await axios.post(backendUrl + '/api/product/add', formData, 
        {headers : {
          token
        }}
      )
      if(response.data.success){
        toast.success(response.data.message)
        /* setName(''), so that name etc becomes blank after submitting */
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
      }else {
        toast.error(response.data.message)
      }
    
      
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
    
  }

  return (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div className="">
        <p className='mb-3'>Upload Image</p>

        <div className=" flex gap-2">
          <label htmlFor="image1">
            {/* The createObjectURL() static method of the URL interface creates a string containing a URL representing the object given in the parameter */}
            <img src={!image1? assets.upload_area : URL.createObjectURL(image1)} alt="image upload" className='w-20' />
            <input onChange={(e)=> setImage1(e.target.files[0])}  type="file"  id="image1" hidden />
          </label>
          <label htmlFor="image2">
            <img src={!image2? assets.upload_area : URL.createObjectURL(image2)} alt="image upload" className='w-20' />
            <input type="file"  id="image2" hidden onChange={(e)=>setImage2(e.target.files[0])} />
          </label>
          <label htmlFor="image3">
            <img src={!image3? assets.upload_area : URL.createObjectURL(image3)} alt="image upload" className='w-20' />
            <input type="file"  id="image3" hidden  onChange={(e)=>setImage3(e.target.files[0])}/>
          </label>
          <label htmlFor="image4">
            <img src={!image4? assets.upload_area : URL.createObjectURL(image4)} alt="image upload" className='w-20' />
            <input type="file"  id="image4" hidden onChange={(e)=>setImage4(e.target.files[0])}/>
          </label>
        </div>
      </div>
      {/* convert the inputs below into controlled input field by 'using ONCHANGE props' */}

      <div className="w-full">
        <p className='mb-2'>Product Name</p>
        <input 
        type="text"
         placeholder='Type Here' 
         required className='w-full bg-gray-200 max-w-[500px] px-3 py-2 rounded-md'
         onChange={(e)=>setName(e.target.value)} value={name} />
      </div>
      <div className="w-full">
        <p className='mb-2'>Product Description</p>
        <textarea
         type="text" 
         placeholder='Write Content Here' 
         required className='w-full bg-gray-200 max-w-[500px] px-3 py-2 rounded-md'
         onChange={(e)=>setDescription(e.target.value)} value={description} />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div className="">
          <p className='mb-2'>Product Category</p>
          <select 
          className='w-full px-3 py-2 rounded bg-gray-200'
          onChange={(e)=>setCategory(e.target.value)}  >
            <option value='Men'>Men</option>
            <option value='Women'>Women</option>
            <option value='Kids'>Kids</option>
          </select>
        </div>
        <div className="">
          <p className='mb-2'>Sub Category</p>
          <select
           className='w-full px-3 py-2 rounded bg-gray-200' 
           onChange={(e)=>setSubCategory(e.target.value)} >
            <option value='Topwear'>Top Wear</option>
            <option value='Bottomwear'>Bottom Wear</option>
            <option value='Winterwear'>Winter Wear</option>
          </select>
        </div>

        <div className="">
          <p className='mb-2'>Product Price</p>
          <input 
          type="Number"
           placeholder='10' 
           className='bg-gray-200 rounded w-full px-3 py-2 sm:w-[120px]'
           onChange={(e)=>setPrice(e.target.value)} value={price}/>
        </div>
      </div>
      <div className="">
        <p className='mb-2'>Product Sizes</p>
        <div className="flex gap-3">
          <div onClick={()=>setSizes(prev => prev.includes('S')? prev.filter((item) => item !== 'S') : [...prev, 'S'])} className="">
            <p className={`${sizes.includes('S') ? 'bg-orange-300' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>S</p>
          </div>
          <div  
          onClick={()=>setSizes(prev => prev.includes('M')? prev.filter((item) => item !== 'M') : [...prev, 'M'])}>
            <p className={`${sizes.includes('M') ? 'bg-orange-300' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>M</p>
          </div>
          <div 
          onClick={()=>setSizes(prev => prev.includes('L')? prev.filter((item) => item !== 'L') : [...prev, 'L'])}>
            <p className={`${sizes.includes('L') ? 'bg-orange-300' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>L</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes('XL')? prev.filter((item) => item !== 'XL') : [...prev, 'XL'])}>
            <p className={`${sizes.includes('XL') ? 'bg-orange-300' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XL</p>
          </div>
          <div onClick={()=>setSizes(prev => prev.includes('XXL')? prev.filter((item) => item !== 'XXL') : [...prev, 'XXL'])}>
            <p className={`${sizes.includes('XXL') ? 'bg-orange-300' : 'bg-slate-200'}  px-3 py-1 cursor-pointer`}>XXL</p>
          </div>
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        {/*'prev => !prev' means if prev is true, then it becomes false; vice versa  */}
        <input type="checkbox"  id="bestSeller" 
        onChange={()=> setBestSeller(prev => !prev)} checked={bestSeller}/>
        <label htmlFor="bestSeller" className='cursor-pointer'>Add To Bestseller</label>
      </div>

      <button type="submit" className='py-3 mt-4 w-28 bg-black text-white rounded-md'>
        ADD</button>

    </form>
  )
}

export default Add