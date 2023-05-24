import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import {getData} from "../../utils/hooks/hooks";

export const Product = ({product}) => {

    const { addToCart, cartItems } = useContext(ShopContext);
    const [productPhoto , setProductPhoto] = useState();
    const cartItemCount = cartItems[product.id];
    getData(`products/${product.id}/images/${product.images[0].id}`).then(res=>{
        setProductPhoto(res)
    })
    const formData = new FormData();
    formData.append('image', document.querySelector('.product__image'));
    return (
        <div className="product">
            <Link to={`/product/${product.id}`} className="product-link">
                <img className="product__image" src={productPhoto} />
                <div className="description">
                    <p>
                        <b>{product.name}</b>
                    </p>
                    <p> ${product.unitPrice}</p>
                </div>
            </Link>
            <button className="addToCartBttn" onClick={() => addToCart(product.id)}>
                Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
    );
};


