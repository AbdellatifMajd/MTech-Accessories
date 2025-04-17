import CommonForm from '@/components/common/Form'
import { loginFormControls } from '@/config'
import { login } from '@/store/authSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { data, Link } from 'react-router-dom'

function Login() {
  const initialState = {
    fullName: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  }

  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch();
  function onSubmit(e) {
    e.preventDefault(); 
    dispatch(login(formData)).then((data)=>{console.log(data)})
  }

  return (
    <div className='mx-auto max-w-md w-full space-y-6 '>
      <div className='flex items-center gap-2'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'> Welcome </h1>
        <img src="/images/hand.png" alt="" className='w-7 '/>
      </div>

      <CommonForm
      formControls={loginFormControls}
      onSubmit={onSubmit}
      formData={formData}
      setFormData={setFormData}
      buttonText={'Sign In'}
      />


      <p className='mt-2'>You don't have an account? <Link to={'/auth/register'} className='font-medium text-primary ml-2 hover:underline'> Register </Link> </p>
    </div>
  )
}

export default Login