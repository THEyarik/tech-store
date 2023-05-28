import "./App.css";
import {Routes, Route, BrowserRouter} from "react-router-dom";
import {Navbar} from "./components/navbar/navbar";

import {Cart} from "./components/cart/cart";
import {ProductDetails} from "./components/productDetails/productDetails";
import Admin from "./components/admin/admin";
import LoginRegistration from "./components/login-registration/login-registration";
import ClientPage from "./components/clientPage/clientPage";
import Homepage from "./components/homepage/homepage";
import Footer from "./components/footer/footer";
import React, {useEffect, useState} from "react";
import PleaseLoginModal from "./components/modals/pleaseLogiModal/pleaseLoginModal";

function App() {
    const [showModalState, setShowModalState] = useState(false);
    const [role ,setRole] = useState(localStorage.getItem("role"));

    const getShowModalState = (state) => {
        setShowModalState(state)
    }

    const getRole = (role)=>{
        setRole(role);
    }


    useEffect(() => {

    }, [role])

    return (
        <div className="App">

            <BrowserRouter>
                {(showModalState) ? <PleaseLoginModal getShowModalState={getShowModalState}/> : ""}
                <Navbar getShowModalState={getShowModalState}  role={role}/>
                <Routes>
                    {
                        (role === "admin") ? <Route path="/admin" element={<Admin/>}/> : ""
                    }
                    <Route path="/" element={<Homepage getShowModalState={getShowModalState}  role={role}/>}/>
                    <Route path="/login" element={<LoginRegistration getRole={getRole}/> }/>
                    <Route path="/cart" element={<Cart/>}/>
                    <Route path="/product/:id" element={<ProductDetails getShowModalState={getShowModalState} role={role}/>}/>
                    <Route path="/client" element={<ClientPage role={role}/>}/>
                </Routes>
                <Footer/>
            </BrowserRouter>
        </div>
    );
}

export default App;

