import React from 'react'
import {useForm} from 'react-hook-form';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';

export default function Register() {
const {register,handleSubmit,formState:{errors}}=useForm();
const navigate=useNavigate();
axios.defaults.withCredentials=true;
const Submit= (data)=>{
console.log(data);
axios.post('http://localhost:8000',data) //sending frontend data to backend
.then(res=>{
  if(res.status==200){
    
    if(res.data.Error) {alert(res.data.Error); return }
    navigate('/');
  }
}).catch(err=>console.log(err)
)
}
  return (
    <div className="main flex flex-col justify-center h-[100vh]">
    <div className='content py-10  text-center  bg-violet-100 p-4 rounded-3xl mx-16 '>
      <form action="" onSubmit={handleSubmit(Submit)}>
        <div className='flex flex-col items-center gap-5'>
        <div className='flex gap-2'>
        <h3 className='font-bold'>Name :</h3>
        <input type="text" className='py-1 px-3' {...register('name',{required:{value:true,message:"name must be entered"}})} placeholder='Enter name'/>
        </div>

        <div className='flex gap-2'>
        <h3 className='font-bold'>Email :</h3>
        <input type="email" className='py-1 px-3' {...register('email',{required:{value:true,message:"email must be entered"}})} placeholder='Enter email' />
        </div>

        <div className='flex gap-2'>
        <h3 className='font-bold'>Password :</h3>
        <input type="password" className='py-1 px-3' {...register('password',{required:{value:true,message:"password must be entered"}})} placeholder='Enter password'/>
      </div>
      </div>
      {errors.name?<div className='text-red-600 mt-2'>{errors.name.message}</div>:errors.email?<div className='text-red-600 mt-2'>{errors.email.message}</div>:errors.password?<div className='text-red-600 mt-2'>{errors.password.message}</div>:""}
      
      <div className="btn">
        <button type="submit" className='mt-5 sm:px-3 sm:py-1 px-1 py-0.5 bg-violet-800 hover:bg-violet-950 px-3 py-1  text-white rounded-md font-bold text-sm lg:text-[15px] mx-1 '>Register</button>
      </div>
      </form>
    </div>
    </div>
  )
}
