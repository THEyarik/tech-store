import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components/navbar/navbar";
import { Shop } from "./components/shop/shop";

import { Cart } from "./components/cart/cart";
import { ProductDetails } from "./components/productDetails/productDetails";
import { ShopContextProvider } from "./components/context/shop-context";
import Admin from "./components/admin/admin";

function App() {
    return (
        <div className="App">
            <ShopContextProvider>
                <Router>
                    <Navbar />
                    <Routes>
                        <Route path="/" element={<Shop />} />
                        <Route path="/admin" element={<Admin/>} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/product/:id" element={<ProductDetails />} />
                    </Routes>

                </Router>
            </ShopContextProvider>
        </div>
    );
}

export default App;

