import axios from 'axios'
import React, { useEffect } from 'react'
import { useState } from 'react'
import LoadingScreen from '../LoaadingScreen/LoadingScreen'
import { Link, useParams } from 'react-router-dom'
import { param } from 'jquery'

export default function BrandProducts() {
  const [prouducts, setprouducts] = useState(null)
 const {id}=useParams()
async function getAllBrandProuduct(){
try {
  const {data}=await axios.get('https://ecommerce.routemisr.com/api/v1/products',
    {params:{"brand":id}}
  )
setprouducts(data.data)

} catch (error) {
console.log(error);
  
}

 }
  
  useEffect(function(){

    getAllBrandProuduct()
  },[])
  
  
  return <>
  {prouducts?<div className="container">
    <div className="row">
      {prouducts.map(function(pro,idx) {return<div className="col-md-2 " key={idx} >
<Link to={`/proDetails/${pro.id}`}> <div className="item bg-primary" >
        <img className='w-100' src={pro.imageCover} alt={pro.title} />  
        <h6>{pro.title}</h6>
        <h6>{pro.category.name}</h6>
        <h6>Price:{pro.price}</h6>
        
        </div></Link>       
      </div>
        
      })}
    </div>
  </div>:<LoadingScreen/>}
  
   
  </>
}
