import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import $ from 'jquery';
import { useNavigate } from 'react-router-dom';
export default function Login({getuserdata}) {
      

  let user={
    
    email:"",
   
    password:""
    
  };
const navigate = useNavigate();

 async function loginUser(obj) {
 try {
  let {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/auth/signin',obj)

  if (data.message==="success") {
    localStorage.setItem('tkn',data.token)
    getuserdata();
    
    $('.sccmsg').fadeIn(1000,function(){
      setTimeout(() => {
          $('.errmsg').fadeOut(1000)
          
      }, 1000);
      
  })
    navigate('/home');
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
    loginUser(values)
    },
    validate:(values)=>{
      let errors={};
      
if(!values.email.includes("@")||!values.email.includes(".com")){
errors.email="invalid email"

}
if(values.password.length<6){
  errors.password="password must be 6 character"
}

      return errors;
    }
  })
  
  return <>
    <div className="container py-5">
          <div style={{display:"none"}} className="errmsg alert alert-danger text-center">
       email or password uncorrect 
    </div>
    <div style={{display:"none"}} className="sccmsg alert alert-success text-center">
      <h2>success</h2> 
    </div>
      <form onSubmit={formik.handleSubmit} action="">
   
        <label htmlFor="email" >email</label>
        <input onChange={formik.handleChange} value={formik.values.email} type="email" placeholder='email.....' id='email' className='form-control' />
        {formik.errors.email && formik.touched.email?  <div className="alert alert-danger text-center ">{formik.errors.email}</div>
:""}
  
        <label htmlFor="password" >password</label>
        <input onChange={formik.handleChange} value={formik.values.password}  type="password" placeholder='password.....' id='password' className='form-control' />
    {formik.errors.password && formik.touched.password?  <div className="alert alert-danger text-center ">{formik.errors.password}</div>
:""}
   
      <button type='submit' className='btn btn-primary'>login</button>
      </form>
    </div>
  </>
}
