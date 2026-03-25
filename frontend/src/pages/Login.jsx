import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const [currentState, setCurrentState] = useState('Login');
  const {token, setToken, navigate, backendUrl}= useContext(ShopContext);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const onSubmitHandler = async(e)=>{
    e.preventDefault();
    try {
      if(currentState === 'Sign Up'){
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password});
        if(response.data.success){
          setToken(response.data.token)
          /* also store the token in localStorage */
          localStorage.setItem('token', response.data.token)
        } else {
          toast.error(response.data.message)
        }
        

      }else {
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        if(response.data.success){
          setToken(response.data.token)
          localStorage.setItem('token', response.data.token)
        }else {
          toast.error(response.data.message)
        }
        

      }
      
    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }

  };

  /* useEffect below moves the user to the homepage when login token is activated */

  useEffect(()=>{
    if(token){
      navigate('/')
    }

  }, [token])
  return (
    <form className='w-full max-w-md bg-white p-8 rounded-lg border shadow-md mx-auto text-gray-800' onSubmit={onSubmitHandler}>
      <div className="flex items-center gap-2 mb-2 mt-10 justify-center">
        <p className='prata-regular text-3xl  '>{currentState}</p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800'/>
      </div>
      <div className="flex justify-center mb-6">
                
            </div>
            <h2 className='text-xl font-bold text-center mb-6'>Hey there! &#128075; </h2>
                
                {
                 currentState === 'Login' ?'' 
                 :<div className="mb-4">
                  <label className='block text-sm font-semibold mb-2'>Name</label>
                  <input
                   type="text"
                   className='w-full p-2 border rounded'
                   placeholder='Enter your name'
                    required 
                    onChange={(e)=>setName(e.target.value)} value={name} />
                </div>}
                <div className="mb-4">
                  <label className='block text-sm font-semibold mb-2'>Email</label>
                  <input 
                  type="email"
                  className='w-full p-2 border rounded'
                  placeholder='Enter your email'
                   required
                   onChange={(e)=>setEmail(e.target.value)} value={email} />
                </div>
                <div className="mb-4">
                  <label className='block text-sm font-semibold mb-2'>Password</label>
                  <input
                   type="password" 
                    className='w-full p-2 border rounded'
                    placeholder='*****' 
                    required
                    onChange={(e)=>setPassword(e.target.value)} value={password}  />
                </div>
                <div className="w-full flex justify-between  text-sm mt-[-8px]">
                  <p className='cursor-pointer mb-4 '>Forgot your password?</p>
                  {
                    currentState === 'Login' ? <p onClick={()=> setCurrentState('Sign Up')} className=' cursor-pointer rounded hover:bg-blue-400 transition mb-2'> Create Account</p>
                     : <p  onClick={()=> setCurrentState('Login')} className='cursor-pointer hover:bg-blue-400 transition mb-2 rounded  ' >Login Here</p>
                  }
                </div>
                <button type='submit' className='w-full  bg-black text-white p-2 rounded-lg font-semibold hover:bg-gray-800 transition cursor-pointer text-center'>
                  {
                    currentState === 'Login'? 'Sign In' : 'Sign Up'
                  }
                </button>
                
                

    </form>
  )
}

export default Login