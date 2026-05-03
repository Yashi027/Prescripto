import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const {token, setToken, backendUrl } = useContext(AppContext)
  const navigate = useNavigate()

  const onSubmitHandler = async(e) => {
    e.preventDefault();
    try {
      if(state=="Sign Up"){
        const {data} = await axios.post(backendUrl+'/api/user/register',{name,email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }else{
        const {data} = await axios.post(backendUrl+'/api/user/login',{email,password})
        if(data.success){
          localStorage.setItem('token',data.token)
          setToken(data.token)
        }else{
          toast.error(data.message)
        }
      }
    } catch (error) {
      toast.error(error.message)
      console.log(error.message)
    }
  }

  useEffect(() => {
    if(token)
      navigate('/')
  },[token])
  return (
    <form className='min-h-[80vh] flex items-center' onSubmit={onSubmitHandler}>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-zinc-600 text-sm shadow-lg'>
        <p className='text-3xl font-semibold'>{state === "Sign Up" ? 'Create Account' : 'Login'}</p>
        <p>Please {state} to Book Appointment</p>
        {
          state === "Sign Up" &&
          <div className='w-full'>
            <p>Full Name</p>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className='border border-zinc-300 rounded w-full mt-1 h-7 p-2' />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='border border-zinc-300 rounded w-full mt-1 h-7 p-2' />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='border border-zinc-300 rounded w-full mt-1 h-7 p-2' />
        </div>
        <button type='submit' className='bg-primary text-white w-full py-2 rounded-md text-base'>
          {state === "Sign Up" ? 'Create Account' : 'Login'}
        </button>
        {
          state === "Sign Up"
            ? <p>Already have an Account? <span onClick={() => setState('Login')} className='text-primary underline cursor-pointer'>Login here</span></p>
            : <p>Create a new account? <span onClick={() => setState('Sign Up')} className='text-primary underline cursor-pointer'>Click here</span></p>
        }

      </div>
    </form>
  )
}

export default Login