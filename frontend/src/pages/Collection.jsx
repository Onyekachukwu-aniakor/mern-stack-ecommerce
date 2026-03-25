import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';


const Collection = () => {
  const {products, search, showSearch} = useContext(ShopContext);
  //use 'search & showSearch' so we can search any product with the searchBar
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory]= useState([]);
  const [sortType, setSortType] =  useState('relevant')

 const toggleCategory =(e)=>{
  //create Logic to select the category

  if(category.includes(e.target.value)){
    setCategory((prev) => prev.filter(item=>item !==e.target.value))
  }else {
    //ie if the above condition is false, below should happen
    setCategory((prev)=>[...prev, e.target.value])
  }

 };

 useEffect(()=>{
  console.log(category)


 },[category]);
 const toggleSubCategory =(e)=>{
  if(subCategory.includes(e.target.value)){
    setSubCategory((prev)=> prev.filter((item)=>item !== e.target.value))
  } else{
    setSubCategory((prev)=>[...prev, e.target.value])
  }
 };

 // apply the above category and subcategory now through APPLYFILTER fucntion

 const applyFilter = ()=>{
  let productsCopy = products.slice();
  //'products.slice'  copies all the products by above

  //'showSearch & Search' so we can search/get and product with the searchBar.
  if(showSearch && search){
    productsCopy = productsCopy.filter((item)=>item.name.toLowerCase().includes(search.toLowerCase()))

  }
  if(category.length >0){
    // filter the product if the above condition is true
   productsCopy =  productsCopy.filter((item)=> category.includes(item.category));
  };

  if (subCategory.length > 0){
    productsCopy = productsCopy.filter((item)=> subCategory.includes(item.subCategory));
  }
  // below triggers the productsCopy
  setFilterProducts(productsCopy);
 };

const sortProduct =()=>{
  // create one copy of filterProduct(fp)
  //slice function below will filter all the products

  let fpCopy = filterProducts.slice();

  //create switch statement

  switch (sortType) {
// (a,b) compares the product prices
    case 'low-High': setFilterProducts(fpCopy.sort((a,b)=>(a.price-b.price)))
      
      break;
      case 'high-low' : setFilterProducts(fpCopy.sort((a,b)=>(b.price- a.price)));
      break;
  
    default:
      applyFilter();
      break;
  }
};


  useEffect(()=>{
    applyFilter()

  },[category, subCategory,search, showSearch,applyFilter, products]);

  useEffect(()=>{
  sortProduct();
  },[sortType, sortProduct]);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t '>
      {/* Filter Options */}
      <div className='min-w-60 '>
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS <img src={assets.dropdown_icon} alt="drop down icon" className={`h-3 sm:hidden ${showFilter? 'rotate-90' : '' }`} /></p>
        
        {/* Category Filter */}
        <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory}  />Women
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory}  />Kids
            </p>
          </div>
        </div>
        {/* Sub Category filter */}
        <div className={`border border-gray-300 pl-5 py-3 my-5 ${showFilter? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className="flex flex-col gap-2 font-light text-gray-700">
            <p className="flex gap-2">
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />Top Wear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} />Bottom Wear
            </p>
            <p className="flex gap-2">
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} />Winter Wear
            </p>
          </div>
        </div>

      </div>
      {/* Right side */}
      <div className="flex-1 ">
        <div className="flex justify-between text-base sm:text-2xl mb-4">
          <Title text1={'ALL'}  text2={'COLLECTIONS'} />
          {/* Product sorting */}
          <select onChange={(e)=>setSortType(e.target.value)} className='border-1 bg-blue-300 rounded-full border-gray-300 text-sm px-2 '>
            <option value="relevant">Sort By: Relevant</option>
            <option value="low-high"> Sort By: Low to High</option>
            <option value="high-low">Sort By: High to Low</option>
          </select>
        </div>
        {/* Map products */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
         {
           filterProducts.map((item,index)=>(
            <ProductItem key={index} id={item._id} image={item.image} price={item.price} name={item.name}/>
           ))
         }
        </div>
      </div>
    </div>
  )
}

export default Collection