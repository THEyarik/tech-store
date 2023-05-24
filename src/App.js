import "./App.css";
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Shop } from "./components/shop/shop";

import { Cart } from "./components/cart/cart";
import { ProductDetails } from "./components/productDetails/productDetails";
import { ShopContextProvider } from "./components/context/shop-context";
import Admin from "./components/admin/admin";
import LoginRegistration from "./components/login-registration/login-registration";
import ClientPage from "./components/clientPage/clientPage";

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <ShopContextProvider>
                        <Navbar />
                        <Routes>
                            <Route path="/" element={<Shop />} />
                            <Route path="/admin" element={<Admin/>} />
                            <Route path="/login" element={<LoginRegistration/>} />
                            <Route path="/cart" element={<Cart />} />
                            <Route path="/product/:id" element={<ProductDetails />} />
                            <Route path="/client" element={<ClientPage/>} />
                        </Routes>

                </ShopContextProvider>
            </BrowserRouter>

        </div>
    );
}

export default App;

