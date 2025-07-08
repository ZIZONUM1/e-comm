import React, { useContext, useEffect, useState } from 'react'
import { createBrowserRouter, createHashRouter, Navigate, RouterProvider } from 'react-router-dom'
import Layout from './Componants/Login/Layout/Layout';
import Home from './Componants/Home/Home';
import Login from './Componants/Login/Login';
import Register from './Componants/register/Register';
import Brands from './Componants/Brands/Brands';
import ProDetails from './Componants/proDetails/proDetails';
import BrandProducts from './Componants/BrandProducts/BrandProducts';
import { jwtDecode } from 'jwt-decode';
import Profile from './Componants/Login/Profile/Profile';
import CartContextProvider from './Conttext/CartContextProvider';
import Cart from './Componants/Cart/Cart';
import Payment from './Componants/Payment/Payment';
import AllOrders from './Componants/allOrders/AllOrders';

export default function App() {

function Protectrout({children}) {
  if (crrUser==null) {
return<Navigate to={'/login'}/>
      
  }else{
return children;
  }

}


  const [crrUser, setcrrUser] = useState(null)
  useEffect(() => {
    if (localStorage.getItem('tkn')!=null &&crrUser==null) {
      getuserdata()
    }
  
     
  }, [])
  
  function getuserdata() {
    let userdata = jwtDecode(localStorage.getItem('tkn'))
    setcrrUser(userdata);
  }
  function clearuserdata() {
    localStorage.removeItem('tkn');
    setcrrUser(null);

  }
  const router = createHashRouter([
    {
      path: "/", element: <Layout clearuserdata={clearuserdata} crrUser={crrUser} />, children: [
        { path: "/", element: <CartContextProvider><Home /></CartContextProvider> },
        { path: "home", element: <CartContextProvider><Home /></CartContextProvider> },
        { path: "cart", element: <CartContextProvider><Cart/></CartContextProvider> },
        { path: "profile", element: <Protectrout><Profile crrUser={crrUser} /></Protectrout> },
        { path: "login", element: <Login getuserdata={getuserdata} /> },
        { path: "prodetails/:id", element: <Protectrout><CartContextProvider><ProDetails /></CartContextProvider></Protectrout> },
        { path: "allorders", element: <Protectrout><CartContextProvider><AllOrders /></CartContextProvider></Protectrout> },
        { path: "payment", element: <Protectrout><CartContextProvider><Payment /></CartContextProvider></Protectrout> },
        { path: "BrandPro/:id", element: <BrandProducts /> },
        { path: "brand", element: <Brands /> },
        { path: "register", element: <Register /> },


      ]

    }
  ])
  return <>

    <RouterProvider router={router} />
  </>
}
