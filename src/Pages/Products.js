import React, {useContext, useRef, useState} from 'react';
import AddProduct from "./AddProduct";
import {loginContext} from "../context/authContext";

const Products = () => {
    // const [bData, setBData] = useState(false);
    const [update, setUpdate]=useState(false);
    const {addProduct,setAddProduct,products,action,setAction}=useContext(loginContext);

    const deleteProduct= (id)=>{
            fetch(`http://localhost:5000/products/${id}`,{
            method:"DELETE"
            })

         .then(res=>res.json())
            .then(data=>console.log(data))
            .catch(err=>console.log(err));
    }


    return (

        <div className="productsPage">
            {
                addProduct ?  <AddProduct></AddProduct>: <button onClick={()=>{setAddProduct(true)}}>Add product</button>
            }
            <div className="productsDiv">
                <table className="productTable">
                    <thead>
                        <tr>
                            <th>Item No</th>
                            <th> Item Name</th>
                            <th> Price</th>
                            <th> Category</th>
                            <th> Company</th>
                            <th>Actions</th>
                        </tr >
                    </thead>
                    <tbody>
                    {
                        products.map((x,i)=>{
                            return (

                                <tr className={''} key={i}>

                                    <td>{i}</td>
                                    <td> {x.name}</td>
                                    <td> {x.price}</td>
                                    <td> {x.category}</td>
                                    <td> {x.company}</td>


                                    <td >
                                        <h4 style={{color:"darkred"}} onClick={()=>{deleteProduct(x._id); setAction(!action)}}>Delete</h4>
                                        <span><h4 style={{color:"darkcyan"}} onClick={()=>{setAction(!action);setUpdate(true);}}>Update</h4></span>
                                    </td>

                                </tr>
                            )
                        })

                    }
                    </tbody>
                </table>

            </div>
        </div>
    );
};

export default Products;