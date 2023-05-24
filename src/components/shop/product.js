import React, {useContext, useState} from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import {getImageData, getImageDataProduct} from "../../utils/hooks/hooks";
window.Buffer = window.Buffer || require("buffer").Buffer;
export const Product = ({product}) => {

    const { addToCart, cartItems } = useContext(ShopContext);
    const [productPhoto , setProductPhoto] = useState("");
    const cartItemCount = cartItems[product.id];
    getImageDataProduct(`products/${product.id}/images/${product.images[0].id}`).then(res=>{
        // const result = res.data
        console.log(res)
        const base64Tex =  window.Buffer.from(res.data, '').toString("base64");
        setProductPhoto(base64Tex);
        // console.log(res)
    })

    return (
        <div className="product">
            <Link to={`/product/${product.id}`} className="product-link">
                <img className="product__image"  src={`data:image/jpeg;base64,+${productPhoto}`}/>
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


