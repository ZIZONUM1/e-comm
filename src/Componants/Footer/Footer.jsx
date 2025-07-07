import React from 'react'

export default function Footer() {
  return <>
  
  <footer className='p-5'>
    
  <h2>fresh cart footer</h2>
<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum.</p>  
  <div className="container mb-5 d-flex justify-content-between">

    <input className='form-control w-75' type="text" placeholder='Email' />
    <button className='btn btn-success w-25 ms-3 btn-lg'>Share app link </button>
  </div>
  <div className="container d-flex align-items-center justify-content-between border-top border-bottom border-2 border-dark py-4 ">
<div className="leftpart">

<ul className='d-flex list-unstyled'>
  <li><h6>Payment Parteners</h6></li>
  <li className='ms-2 text-primary'><i className='fa-brands fa-paypal'></i></li>
  <li className='ms-2 text-primary'><i className='fa-brands fa-cc-amazon-pay'></i></li>
  <li className='ms-2 text-primary'><i className='fa-brands fa-cc-mastercard'></i></li>
</ul>

</div>
<div className="rightpart d-flex align-items-center">
  <h6 className='me-3'>get deliveries with fresh cart</h6>
  <button className='btn btn-dark btn-lg mx-3'>
    <i className='fa-brands fa-app-store '></i>
    available on app store</button>
  <button className='btn btn-dark btn-lg'>
    <i className='fa-brands fa-google-play me-2'></i>
    available on play store</button>
</div>
  </div>
  </footer>
  
  </>
}
