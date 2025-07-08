import React, { useContext } from 'react'
import { cartcontext } from '../../Conttext/CartContextProvider'
import LoadingScreen from '../LoaadingScreen/LoadingScreen'
import { Link } from 'react-router-dom'

export default function Cart() {
 const {numOfCarttems,priceOfCartItems,numOfPro,deleteItem,updateCount}=useContext(cartcontext)
 
 
 return <>{numOfPro?<div className="container">



    <div className="row">
      {numOfPro.map(function(pro,idx) {return<div className="col-md-2 " key={idx} >
<div className="item bg-primary" >
      <Link to={`/proDetails/${pro.product.id}`}> 

       <div className="upper"> <img className='w-100' src={pro.product.imageCover} alt={pro.title} />  
        <h6>{pro.product.title}</h6>
        <h6>Price:{pro.price}</h6>
        
        </div>
        
        </Link>
        <div className='lower' >5
          <input className='form-control' value={pro.count} onChange={function(e){updateCount(pro.product.id,e.target.value)}} type="number" />
            <button onClick={function () {deleteItem(pro.product.id)}} className='btn btn-danger'>-</button>
        </div>
        </div>       
      </div>
        
      })}
    </div>
    <div className="d-flex justify-content-between">
      <h3>Total Price: <span >{priceOfCartItems}</span></h3>
<Link to={'/payment'}>
<button className='btn btn-primary'>  confirm</button>
</Link>
    </div>
  </div>:<LoadingScreen/>}
  
  
  
  
  
  </>
}
