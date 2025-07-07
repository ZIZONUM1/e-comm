import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
export default function Register() {
      

  let user={
    name:"",
    email:"",
    phone:"",
    password:"",
    rePassword:""
  };
const navigate = useNavigate();

 async function registerNewUser(obj) {
 try {
  let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signup',obj)

  if (data.message==="success") {
    
    $('.sccmsg').fadeIn(1000,function(){
      setTimeout(() => {
          $('.errmsg').fadeOut(1000)
          navigate('/login');
      }, 1000);
  })
    
  }

} catch (err) {
  if (err.response && err.response.data) {
    if (err.response.data.errors) {
      console.log(err.response.data.errors.msg); // إذا تأكدت أن errors موجودة وتحتوي msg
    } else if (err.response.data.message) {
      console.log(err.response.data.message); // fallback
    } else {
      console.log("Unexpected error:", err.response.data);
    }
  } else {
    console.log("Network or unknown error", err);
  }
  $('.errmsg').fadeIn(1000,function(){
    setTimeout(() => {
        $('.errmsg').fadeOut(1000)
    }, 3000);
})
  
 }
 
}

let formik=  useFormik({
    initialValues:user,
    onSubmit:(values)=>{
    registerNewUser(values)
    },
    validate:(values)=>{
      let errors={};
      if(values.name.length<3||values.name.length>15){
  errors.name="name must be 3 to 15 character"
}
if(!values.email.includes("@")||!values.email.includes(".com")){
errors.email="invalid email"
}
if(!values.phone.match(/^01[0125][0-9]{8}$/)){
errors.phone="invalid phone"
}
if(values.password.length<6){
  errors.password="password must be 6 character"
}
if(values.password!==values.rePassword){
  errors.rePassword="password not match"
}
      return errors;
    }
  })
  
  return <>
    <div className="container py-5">
          <div style={{display:"none"}} className="errmsg alert alert-danger text-center">
       email allready in use 
    </div>
    <div style={{display:"none"}} className="sccmsg alert alert-success text-center">
      <h2>success</h2> 
    </div>
      <form onSubmit={formik.handleSubmit} action="">
        <label htmlFor="name" >Name</label>
        <input onChange={formik.handleChange} value={formik.values.name}  type="text" placeholder='Name.....' id='name' className='form-control' />
       {formik.errors.name && formik.touched.name?  <div className="alert alert-danger text-center ">{formik.errors.name}</div>
:""}
        <label htmlFor="email" >email</label>
        <input onChange={formik.handleChange} value={formik.values.email} type="email" placeholder='email.....' id='email' className='form-control' />
        {formik.errors.email && formik.touched.email?  <div className="alert alert-danger text-center ">{formik.errors.email}</div>
:""}
        <label htmlFor="phone" >phone</label>
        <input onChange={formik.handleChange} value={formik.values.phone}  placeholder='phone.....' id='phone' className='form-control' />
    {formik.errors.phone && formik.touched.phone?  <div className="alert alert-danger text-center ">{formik.errors.phone}</div>
:""}
        <label htmlFor="password" >password</label>
        <input onChange={formik.handleChange} value={formik.values.password}  type="password" placeholder='password.....' id='password' className='form-control' />
    {formik.errors.password && formik.touched.password?  <div className="alert alert-danger text-center ">{formik.errors.password}</div>
:""}
        <label htmlFor="rePassword" >rePassword</label>
        <input onChange={formik.handleChange} value={formik.values.rePassword} type="password" placeholder='rePassword.....' id='rePassword' className='form-control' />
    {formik.errors.rePassword && formik.touched.rePassword?  <div className="alert alert-danger text-center ">{formik.errors.rePassword}</div>
:""}
      <button type='submit' className='btn btn-primary'>submit</button>
      </form>
    </div>
  </>
}
