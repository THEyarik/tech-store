import React, { useContext } from "react";
import { ShopContext } from "../context/shop-context";

export const CartItem = (props) => {
  const { id, productName, price, productImage } = props.data;
  const { cartItems, addToCart, removeFromCart, updateCartItemCount } =
    useContext(ShopContext);
    console.log(props.data);
    console.log(props.data.images[0].name);
  return (
    <div className="cartItem">
      <img src={props.data.images[0].name} />
      <div className="description">
        <p>
          <b>{props.data.name}</b>
        </p>
        <p> Price: ${props.data.unitPrice}</p>
        <div className="countHandler">
          <button onClick={() => removeFromCart(id)}> - </button>
          <input
            value={cartItems[id]}
            onChange={(e) => updateCartItemCount(Number(e.target.value), id)}
          />
          <button onClick={() => addToCart(id)}> + </button>
        </div>
      </div>
    </div>
  );
};