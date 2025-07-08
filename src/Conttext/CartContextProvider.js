import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { $ } from "jquery";
export const cartcontext=createContext();




export default function CartContextProvider({children}) {
  const nav=useNavigate()
const [numOfCarttems, setnumOfCarttems] = useState(0)
const [priceOfCartItems, setpriceOfCartItems] = useState(0)
const [numOfPro, setnumOfPro] = useState(null)
const [idforcart, setidforcart] = useState(null)
async function addProuductToCart(proid) {
try {
  
 const {data}= await axios.post('https://ecommerce.routemisr.com/api/v1/cart',{
    "productId":proid
  },{headers:{
    'token':localStorage.getItem('tkn')
  }})
  console.log(data);
  if(data.status==='success'){
return true
  }else{
    return false
  };
  
} catch (error) {
console.log(error);
  
}
}


async function getCartDetails() {
try {
  const {data} = await axios.get('https://ecommerce.routemisr.com/api/v1/cart',{headers:{'token':localStorage.getItem('tkn')}}) 
if (data.status==='success') {
  setnumOfCarttems(data.numOfCartItems)
  setpriceOfCartItems(data.data.totalCartPrice)
  setnumOfPro(data.data.products)
  setidforcart(data.data._id)
}
} catch (error) {
  if (error.response.status==404) {
$('.fk').fadeIn(2000,function(){

setTimeout(() => {

  $('.fk').fadeOut(2000)
   nav=('/home')
}, 500);

})
   
  }
  
}


}

async function deleteItem(id) {
  
try {
  const {data}=await axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{headers:{'token':localStorage.getItem('tkn')}})
if (data.status==='success') {
  setnumOfCarttems(data.numOfCartItems)
  setpriceOfCartItems(data.data.totalCartPrice)
  setnumOfPro(data.data.products)
console.log(data);

  return true;

}
} catch (error) {
  console.log(error);
  
}
}

async function updateCount(id,count) {
try {
  const {data} = await axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${id}`,{'count':count},{headers:{'token':localStorage.getItem('tkn')}}) 
if (data.status==='success') {
  setnumOfCarttems(data.numOfCartItems)
  setpriceOfCartItems(data.data.totalCartPrice)
  setnumOfPro(data.data.products)
  console.log(data);
  
}
} catch (error) {
  console.log(error);
  
}


}


useEffect(() => {
  getCartDetails()

   
}, [])  




return <cartcontext.Provider value={{addProuductToCart,numOfPro,priceOfCartItems,numOfCarttems,deleteItem,updateCount,idforcart}}>
<div  style={{'display':'none'}} className='alert fk alert-danger'>
<h2>
  cart not exist
</h2>
</div>
{children}

  </cartcontext.Provider>
}
