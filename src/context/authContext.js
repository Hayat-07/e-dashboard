import React, {createContext, useEffect, useState} from 'react';
export let loginContext = createContext(null);
const AuthContext = ({children}) => {
   const [products, setProducts]=useState([]);
   const [action, setAction]=useState(false);
   const [isLoggedIn, setIsLoggedIn]=useState(false);
   const [user, setUser]=useState("");
   const [addProduct, setAddProduct]=useState(false);



useEffect(()=>{
    fetch('http://localhost:5000/products')
        .then(res=>res.json())
        .then(data=>setProducts(data))
        .catch(err=>console.log(err));
},[addProduct,action]);

    useEffect(() => {
        let auth = localStorage.getItem("user");
        // auth=JSON.parse(auth);
        // console.log(auth);
        auth? setIsLoggedIn(true): setIsLoggedIn(false);
       // auth && setUser(auth);


    }, []);
    console.log(user);
    console.log(products);



    return (
        <div>
            <loginContext.Provider value={ {isLoggedIn,
                setIsLoggedIn,
                user,
                setUser,
                setAddProduct,
                addProduct,
                products,
                setProducts,
                setAction,
                action,

            } }>

                {children}

            </loginContext.Provider>
        </div>
    );
};

export default AuthContext;