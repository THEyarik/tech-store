import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/shop-context";
import { PRODUCTS } from "../../products";
import { CartItem } from "./cart-item";
import { Link, useNavigate } from "react-router-dom";
import { getData } from "../../utils/hooks/hooks";

import "./cart.css";
export const Cart = () => {

  const { cartItems, getTotalCartAmount, checkout } = useContext(ShopContext);
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();

  const [productsData, setProductsData] = useState([]);


  useEffect(() => {
    getData("products/all").then(res => {
      setProductsData(res)
    })
  }, [])
  console.log(productsData);
  return (
    <div className="cart">
      <div>
        <h1>Your Cart Items</h1>
      </div>
      <div className="cart">
        {productsData.map((product) => {

          if (cartItems[product.id] !== 0) {
            return <CartItem data={product} />;
          }
        })}
      </div>

      {totalAmount > 0 ? (
        <div className="checkout">
          <div className="subtotal">
            <h2>Subtotal: ${totalAmount.toLocaleString()}</h2>
          </div>
          <div className="buttons">
            <button onClick={() => navigate("/")}>Continue Shopping</button>
            <button onClick={() => { checkout();  }}>
              Checkout
            </button>
          </div>
        </div>

      ) : (
        <h1> Your Shopping Cart is Empty</h1>
      )}
    </div>
  );
};