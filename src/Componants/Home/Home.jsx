import axios from 'axios'
import React, { useContext, useEffect } from 'react'
import { useState } from 'react'
import LoadingScreen from '../LoaadingScreen/LoadingScreen'
import { Link } from 'react-router-dom'
import { cartcontext } from '../../Conttext/CartContextProvider'
import $ from "jquery";
export default function Home() {
  const {addProuductToCart,deleteItem}=useContext(cartcontext);
  const [prouducts, setprouducts] = useState(null)
async function getAllProuduct(){
try {
  const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products')
setprouducts(data.data)

} catch (error) {
console.log(error);
  
}

 }
 async function addmypro(id ,idx){
  if (await addProuductToCart(id)==true) {
    $('.bgSuc').fadeIn(2000,function () {
      setTimeout(() => {
        $('.bgSuc').fadeOut(2000)
      }, 2000);
      
    })
    $(`#addbtn${idx}`).fadeOut(500);
    $(`#removebtn${idx}`).fadeIn(500);
  }
}
  
async function removemypro(id ,idx){
  if (await deleteItem(id)==true) {
    $('.bgDel').fadeIn(2000,function () {
      setTimeout(() => {
        $('.bgDel').fadeOut(2000)
      }, 2000);
      
    })
    $(`#addbtn${idx}`).fadeIn(500);
    $(`#removebtn${idx}`).fadeOut(500);
  }
}

  useEffect(function(){

    getAllProuduct()
  },[])
  
  
  return <>
  {prouducts?<div className="container">


  <div style={{'display':'none'}} className="alert bgSuc alert-success position-fixed bottom-0 start-0 ">
    product added sccessfully...
  </div>

<div style={{'display':'none'}} className="alert bgDel alert-danger position-fixed bottom-0 start-0 ">
    product removed sccessfully...
  </div>

    <div className="row">
      {prouducts.map(function(pro,idx) {return<div className="col-md-2 " key={idx} >
<div className="item bg-primary" >
      <Link to={`/proDetails/${pro.id}`}> 

       <div className="upper"> <img className='w-100' src={pro.imageCover} alt={pro.title} />  
        <h6>{pro.title}</h6>
        <h6>{pro.category.name}</h6>
        <h6>Price:{pro.price}</h6>
        </div></Link>
       <div className="lower">
        <button id={`addbtn${idx}`} onClick={function(){addmypro(pro.id,idx)}}  className='btn btn-success'>+</button>
        <button id={`removebtn${idx}`} onClick={function(){removemypro(pro.id,idx)}} style={{"display":'none'}}  className='btn btn-danger'>-</button>
       </div>
        </div>       
      </div>
        
      })}
    </div>
  </div>:<LoadingScreen/>}
  
   
  </>
}
