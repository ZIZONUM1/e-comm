import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react'
import { ListGroup } from 'react-bootstrap';
export const cartcontext=createContext();




export default function CartContextProvider({children}) {
const [numOfCarttems, setnumOfCarttems] = useState(0)
const [priceOfCartItems, setpriceOfCartItems] = useState(0)
const [numOfPro, setnumOfPro] = useState(null)
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
}
} catch (error) {
  console.log(error);
  
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
useEffect(() => {
  getCartDetails()

   
}, [])  




return <cartcontext.Provider value={{addProuductToCart,numOfPro,priceOfCartItems,numOfCarttems,deleteItem}}>
{children}
  </cartcontext.Provider>
}
