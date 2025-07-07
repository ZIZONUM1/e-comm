import React from 'react'
import Navbar from '../../navbar/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './../../Footer/Footer';
import MyNavbar from '../../navbar/Navbar';

export default function Layout({crrUser,clearuserdata}) {
  return <>
  <MyNavbar clearuserdata={clearuserdata} crrUser={crrUser}/>
  <Outlet/>
  <Footer/>
  </>
}
