import React, {useContext} from 'react';
import {Link, useNavigate} from "react-router-dom";
import {loginContext} from "../context/authContext";


const SignUp = () => {
    const { setIsLoggedIn,user,setUser}=useContext(loginContext);
    const navigate = useNavigate();
    // const [userInfo, setUserInfo]=useState({});
   const signUp= async (e)=>{
       e.preventDefault();
       const name= e.target.name.value;
       const email= e.target.email.value;
       const password= e.target.password.value;


      let result=await fetch('http://localhost:5000/register',{
                   headers:{"Content-Type":"application/json"},
                   method:"POST",
                   body:JSON.stringify({name,email,password})
       })
       result = await result.json();

      if(result._id){
          localStorage.setItem("user",JSON.stringify(result));
          // setUser(result);
setIsLoggedIn(true);
          navigate('/products');
      }
      console.log(result);

   }
    // console.log(userInfo);
    return (
        <div className="register">
            <h1>Register</h1>
            <form onSubmit={signUp}>
                <input type="name" name="name" placeholder="Name"/>
                <input type="email" name="email" placeholder="Email"/>
                <input type="password" name="password" placeholder="Password"/>
                <button className="registerBtn" type="submit">Register </button>
            </form>
            <Link to="/logIn">Already have an account.(GO BACK)</Link>
        </div>
    );
};

export default SignUp;