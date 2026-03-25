import React, {  useEffect, useState } from 'react'
import { createContext } from 'react'
//import { products } from '../assets/assets'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
export const ShopContext =createContext();
import axios from 'axios'

// we can install all the common variable and state variables at one place, using this createContext API


const ShopContextProvider = (props) => {
    const currency = '$';
    const delivery_fee = '0';
    // connecting front end to backend
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [cartItems, setCartItems] = useState({});
    const [products, setProducts] = useState([]);
    const [token, setToken] = useState('');
    const navigate = useNavigate();
    

     const addToCart = async (itemId, size) => {

      if(!size){
        toast.error('Select product size');
        return;
      }

// create a copy of the CARTITEMS & acces it with 'cartData' variable
      let cartData = structuredClone(cartItems);

      if(cartData[itemId]){
        if(cartData[itemId][size]){
          cartData[itemId][size] += 1;
        }else{
          cartData[itemId][size] = 1;

        }
      } else{
        cartData[itemId] = {};
        cartData[itemId][size] = 1;

      } setCartItems(cartData);

      if(token){
        try {
          await axios.post(backendUrl + '/api/cart/add', {itemId, size}, {headers : {token}})
          
        } catch (error) {
          console.log(error)
          toast.error(error.message)
          
        }
      }
      
    };

    // so that the cart bag is updated automatically as soon as you addToCart
   const getCartCount = ()=>{

     let totalCount = 0;
     // use for in loop
    for(const items in cartItems){
      for(const item in cartItems[items]){
        try {
          if(cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
            

          }
        } catch (error) {
          console.log(error)
        }

      }
    }
    return totalCount;

   };

   const updateQuantity =async (itemId, size,quantity) => {
      let cartData = structuredClone(cartItems);
      cartData[itemId][size] = quantity;

      setCartItems(cartData);

      if(token){
        try {
          await axios.put(backendUrl + '/api/cart/update', {itemId, size,quantity}, {headers : {token}})
        } catch (error) {
          console.log(error)
          toast.error(error.message)
          
        }
      }
    };

    const getCartAmount =  () => {
      let totalAmount = 0;
      for(const items in cartItems) {
        /* 'product._id === items' compares both */
        let itemInfo = products.find((product)=> product._id === items);
        for(const item in cartItems[items]){
          try {
            if(cartItems[items][item] > 0){
              totalAmount += itemInfo.price * cartItems[items][item];
            }
          } catch (error) {
            console.log(error)
            
          }
        }
      }
      return totalAmount;

      
    };

    const getProductsData = async () => {
      try {
        const response = await axios.get(backendUrl + '/api/product/list');
        if(response.data.success){
          setProducts(response.data.products)
        } else{
          toast.error(response.data.message)
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
        
      }
      
    };

    const getUserCart = async (token) => {
      try {
        const response = await axios.get(backendUrl + '/api/cart/get', {}, {headers : {token}})
        if(response.data.success){
          setCartItems(response.data.cartData)
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message)
        
      }
    }

    useEffect(()=>{
      getProductsData();

    },[]);
    
    /* useEffect below keeps you signed in when you log in. refresh button does not log u out
     setToken(localStorage.getItem('token'))*/

    useEffect(()=>{
      if(!token && localStorage.getItem('token')){
        setToken(localStorage.getItem('token'))
        getUserCart(localStorage.getItem('token'))
      }

    },[token]);


    const value = {products, currency, delivery_fee, showSearch, setShowSearch, search, setSearch, cartItems, addToCart,setCartItems, getCartCount, updateQuantity, getCartAmount, navigate, backendUrl, token, setToken }

   


  return (
    <ShopContext.Provider  value={value}>
        {props.children}
        </ShopContext.Provider>
  )
}

export default ShopContextProvider