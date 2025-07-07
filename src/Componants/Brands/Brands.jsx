import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import LoadingScreen from '../LoaadingScreen/LoadingScreen'
import { Link } from 'react-router-dom'

export default function Brands() {
  const [prouducts, setprouducts] = useState(null)
async function getAllProuduct(){
try {
  const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/brands')
setprouducts(data.data)

} catch (error) {
console.log(error);
  
}

 }
  
  useEffect(function(){

    getAllProuduct()
  },[])
  
  
  return <>
  {prouducts?<div className="container">
    <div className="row">
      {prouducts.map(function(pro,idx) {return<div className="col-md-3 " key={idx} >
       <Link to={`/BrandPro/${pro._id}`}>
        <div className="item text-center" >
        <img className='w-100' src={pro.image} alt={pro.title} />  
        <h6>{pro.name}</h6>
        
        
        </div>
       </Link>
      </div>
        
      })}
    </div>
  </div>:<LoadingScreen/>}
  
   
  </>
}
