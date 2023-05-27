import "./App.css";
import { Routes, Route, BrowserRouter} from "react-router-dom";
import {Navbar} from "./components/navbar/navbar";
import {Shop} from "./components/shop/shop";

import {Cart} from "./components/cart/cart";
import {ProductDetails} from "./components/productDetails/productDetails";
import Admin from "./components/admin/admin";
import LoginRegistration from "./components/login-registration/login-registration";
import ClientPage from "./components/clientPage/clientPage";
import Hero from "./components/hero/hero";
import Homepage from "./components/homepage/homepage";
import Footer from "./components/footer/footer";
import React from "react";

function App() {
    const role = localStorage.getItem("role");
    return (
        <div className="App">
            <BrowserRouter>
                    <Navbar/>

                    <Routes>

                        <Route path="/" element={<Homepage/>}/>
                        {
                            (role === "admin") ? <Route path="/admin" element={<Admin/>}/> : ""
                        }
                        <Route path="/login" element={<LoginRegistration/>}/>
                        <Route path="/cart" element={<Cart/>}/>
                        <Route path="/product/:id" element={<ProductDetails/>}/>
                        <Route path="/client" element={<ClientPage role={role}/> }/>
                    </Routes>
                <Footer/>
            </BrowserRouter>

        </div>
    );
}

export default App;

