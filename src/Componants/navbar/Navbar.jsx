// Navbar.js
import { Link, useNavigate } from 'react-router-dom';

import logo from '../../assets/5324664.jpg';
import './Navbar.css';
const MyNavbar = ({crrUser,clearuserdata}) => {
let navigate=useNavigate();
  function logoutuser() {
    clearuserdata();
    navigate('/login');
  }
  return (
    <>
  <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <Link className="navbar-brand" to="#"><img className='logo' src={logo} alt="" /></Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav me-auto">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/home">Home</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/brand">Brands</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/cart">Cart</Link>
        </li>
      </ul>
      <ul className="navbar-nav ms-auto">
        {crrUser?<>   <li className="nav-item">
          <Link className="nav-link" to="/profile">Profile</Link>
        </li>
        <li className="nav-item">
          <span  onClick={logoutuser} className="nav-link" >Logout</span>
        </li></>:<><li className="nav-item">
          <Link className="nav-link" to="/register">signup</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/login">login</Link>
        </li>
     </>}
        
      </ul>
    </div>
  </div>
</nav>
    </>
  );
};

export default MyNavbar;
