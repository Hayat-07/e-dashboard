import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {loginContext} from "../context/authContext";

const MyNav = () => {
    const nagigate =useNavigate();
    const {isLoggedIn, setIsLoggedIn}=useContext(loginContext);
    let auth = localStorage.getItem("user");
    let name="";
    if (auth){
         name = JSON.parse(auth).name;
    }



  const stateChange=(x)=>{
     setIsLoggedIn(x);
  }
// let name= JSON.parse(user);

    return (
        <div style={{display:"flex", justifyContent:"center"}}>
            <div style={{display:"flex"}}>
                <img  src="/logo.png" alt="logo" height={"100px"} /><span> <h1 style={{color:"darkgray" ,fontSize:"20px",padding:"10px"}}>{name}</h1></span>
            </div>

            <ul className="nav">
                <li><Link to="/">Home</Link></li>
                {
                    isLoggedIn &&
                    <>
                        <li><Link to="/products">Products</Link></li>
                        <li><Link to="/addproduct">Add Product</Link></li>
                        <li><Link to="/updateproduct">Update Product</Link></li>
                        <li><Link to="/profile">Profile</Link></li>
                    </>
                }
                {
                    isLoggedIn?<li><button type="button" onClick={()=>{

                        localStorage.removeItem("user");
                        stateChange(false);
                        nagigate("/")

                    }}>Logout</button></li>: <li><Link to="/login">LogIn</Link></li>
                }

            </ul>
        </div>
    );
};

export default MyNav;