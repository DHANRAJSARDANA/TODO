import React from 'react'
import {useForm} from 'react-hook-form'; 
import {Link} from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
export default function Home({action}) {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors,isSubmitting },
  } = useForm()

  const navigate=useNavigate();
  const onSubmit = async (data) => {
    axios.post('http://localhost:8000/login',data).then((res)=>{
      if(res.data.Status==200){
      navigate('/todo'); 
    }
    if(res.data.Error){
      alert(res.data.Error);
    return
    }
    }).catch(err=>console.log(err))
    
  }
  return (
       <div className='pt-[40%] lg:pt-[10%]' >
      <form action={action} onSubmit={handleSubmit(onSubmit)}>
        <div className='content my-4  text-center  bg-violet-100 p-4 rounded-3xl mx-8  '>
        {isSubmitting && <div>Loading....</div>}

          <div className='sub-content justify-center  flex flex-wrap gap-3 my-4'>
            <h5 className='font-bold'>Email :</h5>
            <input type="email" className='w-2/5 p-1 ' {...register("email",{required:{value:true,message:"email must be entered"},minLength:{value:5,message:"email must be of atleast 5 characters"}})} placeholder='enter email' />

          </div>
          {errors.email?<div className='text-red-600 text-[15px] sm:text-xl'>{errors.email.message}</div>:""}
          <div className='sub-content justify-center flex flex-wrap gap-3 my-4'>
            <h5 className='font-bold'>password :</h5>
            <input type="password" {...register("password",{required:{value:true,message:"password must be entered"}})} className='w-2/5 p-1' placeholder='enter password' />
          </div>
          {errors.password?<div className='text-red-600 text-[15px] sm:text-xl pb-5'>{errors.password.message}</div>:""}
          
          <button type='submit' disabled={isSubmitting} className={isSubmitting?'sm:px-3 sm:py-1 px-1 py-0.5 px-3 py-1  text-white rounded-md font-bold text-sm lg:text-[15px] mx-1 bg-violet-400':'sm:px-3 sm:py-1 px-1 py-0.5 bg-violet-800 hover:bg-violet-950 px-3 py-1  text-white rounded-md font-bold text-sm lg:text-[15px] mx-1 '}>Submit</button>
        </div>
      </form>
      <div className='flex justify-center'><span>Or</span></div>
     
      <div className='content my-4  text-center  bg-violet-100 p-4 rounded-3xl mx-8  '>
      <div className='sub-content justify-center  flex flex-wrap gap-3 my-4 font-medium text-lg'>Register as a new user</div> 
      <Link to="/register" className='sm:px-3 sm:py-1 px-1 py-0.5 bg-violet-800 hover:bg-violet-950 px-3 py-1  text-white rounded-md font-bold text-sm lg:text-[15px] mx-1 '>Register</Link>       
        </div>        
     
    </div>
  )
}
