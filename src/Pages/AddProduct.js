import React, {useContext, useState} from 'react';
import {loginContext} from "../context/authContext";
import {Navigate, useNavigate} from "react-router-dom";


const AddProduct = () => {

    const {addProduct,setAddProduct}=useContext(loginContext);
const [inputError, setInputError]=useState({
    name:"",
    price:"",
    userId:"",
    category:"",
    company:""
});
const navigate = useNavigate();


    const add= async (e)=>{
        e.preventDefault();
        const name= e.target.name.value;
        const price= e.target.price.value;
        const userId= e.target.userId.value;
        const category= e.target.category.value;
        const company= e.target.company.value;


        let result=await fetch('http://localhost:5000/addProduct',{
            headers:{"Content-Type":"application/json"},
            method:"POST",
            body:JSON.stringify({name,price,userId,category,company})
        })
        result = await result.json();

        if(result._id){
            alert("Product added successfully");
        }
        console.log(result);


    }

    const formValidate = (e)=>{
        console.log(e.target);
        let inputName =e.target.name;
        let inputValue =e.target.value;

        //
        // if(inputValue===""){
        //     setInputError("please fill up all input Box!!")
        // }else if(inputName=== "name"){
        //     if(inputValue=== !String ){ setInputError("please type Valid name!!") }
        // }else if(inputName=== "price"){
        //     if(inputValue=== !Number ){ setInputError("please type Numbers only!!") }
        //
        // }
        // else if(inputName=== "category"){
        //     if(inputValue=== !Number || inputValue=== ""){ setInputError("please type Numbers only!!") }
        // }
        // else if(inputName=== "price"){
        //     if(inputValue=== !Number || inputValue=== ""){ setInputError("please type Numbers only!!") }
        // }
    }
    // console.log(userInfo);
    return (
        <div className="addProduct">
            <h1>Add Product Details Here</h1>
           <div className="addProductForm">
               <form onSubmit={add}>
                   <input type="name" name="name" placeholder="Name" onChange={ formValidate}/>
                   <input type="price" name="price" placeholder="price" onChange={ formValidate}/>
                   <input type="userId" name="userId" placeholder="userId (optional)" onChange={ formValidate}/>
                   <input type="category" name="category" placeholder="category" onChange={ formValidate}/>
                   <input type="company" name="company" placeholder="company" onChange={ formValidate}/>
                   <button className="registerBtn" type="submit">Add product </button>


                   {/*{*/}
                   {/* (inputError==="")? null: <h6 style={{color:"red"}}>{inputError}</h6>*/}
                   {/*}*/}

               </form>


               <div>
                   <h3>Image</h3>
               </div>
           </div>
            <button className="registerBtn" type="button" onClick={()=>{setAddProduct(false)}} >Cancel or Back </button>

        </div>
    );
};

export default AddProduct;