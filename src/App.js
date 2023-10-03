
import './App.css';

import Home from "./components/Home";
import { Route, Routes} from "react-router-dom";
import MyNav from "./components/MyNav";
import Footer from "./components/Footer";
import SignUp from "./Pages/SignUp";
import Products from "./Pages/Products";
import AddProduct from "./Pages/AddProduct";
import UpdateProduct from "./Pages/UpdateProduct";
import Profile from "./Pages/Profile";
import PrivetComponent from "./components/PrivetComponent";
import LogIn from "./Pages/LogIn";




function App() {
  return (

    <div>

        <div className="App">
            <MyNav></MyNav>
            <Routes>
                <Route element={<PrivetComponent/>}>

                    <Route path="/products" element={<Products/>}></Route>
                    <Route path="/addproduct" element={<AddProduct/>}></Route>
                    <Route path="/updateproduct" element={<UpdateProduct/>}></Route>
                    <Route path="/logout" element={<h3>Log out</h3>}></Route>
                    <Route path="/profile" element={<Profile/>}></Route>

                </Route>

                <Route path="/" element={<Home></Home>}></Route>
                <Route path="/signUp" element={<SignUp/>}></Route>
                <Route path="/logIn" element={<LogIn/>}></Route>
            </Routes>
            <Footer></Footer>
        </div>
    </div>
  );
}

export default App;
