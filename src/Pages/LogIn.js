import React, {useContext} from 'react';
import {loginContext} from "../context/authContext";
import {Link, useNavigate} from "react-router-dom";

const LogIn = () => {
    const { setIsLoggedIn,user,setUser}=useContext(loginContext);
    const navigate = useNavigate();

    const login= async (e)=>{
        e.preventDefault();
        const email= e.target.email.value;
        const password= e.target.password.value;


        let result=await fetch('http://localhost:5000/logIn',{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({email,password})
        })
        result = await result.json();
        console.log(result);

        if(result._id){
            localStorage.setItem("user",JSON.stringify(result));
            // console.log(result);
            // setUser(result);
            setIsLoggedIn(true);
            navigate('/products');
        }
        // console.log(result.name);

    }
    return (
        <div className="register">
            <h1>Please LogIn</h1>
            <form onSubmit={login}>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button className="registerBtn" type="submit">LogIn</button>
            </form>
            <Link to="/signUp">Create account.</Link>
        </div>
    );
};

export default LogIn;