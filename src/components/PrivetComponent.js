import React from 'react';
import {Navigate, Outlet} from "react-router-dom";

const PrivetComponent = () => {

    let authLocalStorage = localStorage.getItem("user");
   return authLocalStorage? <Outlet></Outlet>: <Navigate to="/"/>;



};

export default PrivetComponent;