import axios from 'axios'
import React, { useContext } from 'react'
import { cartcontext } from '../../Conttext/CartContextProvider';
import LoadingScreen from '../LoaadingScreen/LoadingScreen';

export default function Payment() {
   const {idforcart}=useContext(cartcontext)
   async function confirmOrders() {
try {
        const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/${idforcart}`,{
    "shippingAddress":{
        "details": document.querySelector('#details').value,
        "phone": document.querySelector('#phone').value,
        "city": document.querySelector('#city').value
        }
},{headers:{'token':localStorage.getItem('tkn')}})
console.log(data);

} catch (error) {
    console.log(error);
    
} 




}

 async function confirmOrderscart() {
try {
        const {data}=await axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${idforcart}`,{
    "shippingAddress":{
        "details": document.querySelector('#details').value,
        "phone": document.querySelector('#phone').value,
        "city": document.querySelector('#city').value
        }
},{headers:{'token':localStorage.getItem('tkn')},params:{'url':'http://localhost:3000'}})
if (data.status=='success') {
    window.open(data.session.url)
}

} catch (error) {
    console.log(error);
    
} 




}
   
   return <>


        <div className="container">
            <label htmlFor="phone">Phone</label>
            <input className='mt-2 form-control' type="text" id='phone' />
            <label htmlFor="city">City</label>
            <input className='mt-2 form-control' type="text" id='city' />
            <label htmlFor="details">Address Details</label>
            <input className='mt-2 form-control' type="text" id='details'/>
            <button className='btn btn-praimry' onClick={confirmOrders}>confirm cash</button>
             <button className='btn btn-praimry' onClick={confirmOrderscart}>confirm cart</button>
        </div>







    </>
}
