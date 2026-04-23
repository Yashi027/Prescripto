import React, { useState } from 'react'

const Login = () => {

  const [state, setState] = useState('Sign Up')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')

  const onSubmitHandler = (e) => {
    e.preventDefault();
  }
  return (
    <form className='min-h-[80vh] flex items-center'>
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
              onChange={(e) => setName(e.target.name)}
              className='border border-zinc-300 rounded w-full mt-1 h-7 p-2' />
          </div>
        }

        <div className='w-full'>
          <p>Email</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setName(e.target.email)}
            className='border border-zinc-300 rounded w-full mt-1 h-7 p-2' />
        </div>
        <div className='w-full'>
          <p>Password</p>
          <input
            type="text"
            value={password}
            onChange={(e) => setName(e.target.password)}
            className='border border-zinc-300 rounded w-full mt-1 h-7 p-2' />
        </div>
        <button className='bg-primary text-white w-full py-2 rounded-md text-base'>
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