import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Orders = () => {
  const { backendUrl, token, currency} = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if(!token){
        return null
      }
      const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers : {token}});
      if(response.data.success){
        // save all order item in : allOrdersItem = []. 'reverse' below displays ist the latest order 
        let allOrdersItem = []
        response.data.orders.map((order)=>{
          order.items.map((item)=>{
            item['status'] = order.status
            item['payment'] = order.payment
            item['paymentMethod'] = order.paymentMethod
            item['date'] = order.date
            allOrdersItem.push(item)
          })
        })
        setOrderData(allOrdersItem.reverse());
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message)
      
    }
    
  };

  useEffect(()=>{
    loadOrderData()

  })
  return (
    <div className='border-t pt-16'>
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      {/* Display orders data */}
      <div className="">
        {
          orderData.map((item, index)=>(
            <div className="py-4 border-t border-b text-gray-700 flex flex-col md:flex-row md:items-center md:justify-between gap-4" key={index}>
              <div className="flex items-start gap-6 text-sm ">
                <img src={item.image[0]} alt="product image" className='w-16 sm:w-20' />
                <div className="">
                  <p className='text-base font-medium'>{item.name}</p>
                  <div className="gap-3 mt-2 flex items-center text-base text-gray-700">
                    <p className=''>{currency} {item.price}</p>
                    <p>Quantity : {item.quantity}</p>
                    <p>Size: {item.size}</p>

                  </div>
                  <p className='mt-2'>Date: <span className='text-gray-400'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-2'>Payment: <span className='text-gray-400'>{item.paymentMethod}</span></p>
                </div>
                <div className="sm:w-1/2 flex justify-between">
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-green-500'></p>
                  <p className='sm:text-sm text-base'>{item.status}</p>
                </div>
                <button
                 className='border border-blue-300 px-4 py-2 text-sm font-medium rounded-full'
                 onClick={loadOrderData}>Track Order</button>
                </div>

              </div>
          
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders