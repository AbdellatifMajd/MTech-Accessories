import CommonForm from '@/components/common/Form'
import { registerFormControls } from '@/config'
import { register } from '@/store/authSlice'

import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'


function Register() {
  const initialState = {
    fullName: '', 
    email: '', 
    password: '',
    confirmPassword: ''
  }

 
  const [formData, setFormData] = useState(initialState)
  const dispatch = useDispatch() ;
  const navigate = useNavigate();

  function onSubmit(event) {
    event.preventDefault();
    dispatch(register(formData)).then((data) => {
      if (data?.payload?.success) {
        toast(data?.payload?.message, {style: {color: "green"}})
        navigate("/auth/login");
      } else {
        toast(data?.payload?.message, {style: {color: "red"}})
              }
    });
  }

  return (
    <div className='mx-auto max-w-md w-full space-y-6 '>
      <div className='flex items-center gap-2'>
        <h1 className='text-3xl font-bold tracking-tight text-foreground'>Create Account</h1>
        <img src="/images/hand.png" alt="" className='w-7 '/>
      </div>

      <CommonForm
      formControls={registerFormControls}
      onSubmit={onSubmit}
      formData={formData}
      setFormData={setFormData}
      buttonText={'Sign Up'}
      />


      <p className='mt-2'>Already have account? <Link to={'/auth/login'} className='font-medium text-primary ml-2 hover:underline'> Login </Link> </p>
    </div>
  )
}

export default Register