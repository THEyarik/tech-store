import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {ShopContext} from "../context/shop-context";
import {getFileDataProduct} from "../../utils/hooks/hooks";


export const Product = ({product}) => {

    const {addToCart, cartItems,addNewToCart} = useContext(ShopContext);
    const [productPhoto, setProductPhoto] = useState("");
    const cartItemCount = cartItems[product.id];
    
    useEffect(() => {
        addNewToCart(product.id)
        if (product){
            getFileDataProduct(`products/${product.id}/images/${product.images[0].id}`).then(blob=>{
                const imageUrl = URL.createObjectURL(blob)
                setProductPhoto(imageUrl);
            })
        }
    }, [])
    return (
        <div className="product">

            <Link to={`/product/${(product)? product.id:""}`} className="product-link">
                <img className="product__image" src={`${productPhoto}`}/>
                <div className="description">
                    <p>
                        <b>{(product)? product.name :""}</b>
                    </p>
                    <p> ${(product)? product.unitPrice :" "}</p>
                </div>
            </Link>
            <button className="addToCartBttn" onClick={() => addToCart((product)? product.id:"")}>
                Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
            </button>
        </div>
    );
};


