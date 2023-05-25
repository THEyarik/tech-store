import React, {useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/shop-context";
import "./productDetails.css";
import {getData, getImageDataProduct} from "../../utils/hooks/hooks";

export const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart, cartItems } = useContext(ShopContext);
  const [productData, setProductData] = useState([]);
    const [productPhoto, setProductPhoto] = useState("");

const cartItemCount = cartItems[id];
  //
 useEffect(()=>{
   getData(`products/${id}`).then(res=>{
     setProductData(res)
       getImageDataProduct(`products/${res.id}/images/${res.images[0].id}`).then(blob=>{
           const imageUrl = URL.createObjectURL(blob)
           setProductPhoto(imageUrl);
       })
   })

 },[])

  return (
    <div className="product-container">
        <div className="product-item">
            <div className="product-image-container">
                <img src={productPhoto}  className="product-image" />
            </div>
            <div className="product-details-container">
                <h1 className="product-name">{productData.name}</h1>
                <div className="product-details">
                    <p><b>ID:</b> {productData.id}</p>
                    <p><b>Price:</b> ${productData.unitPrice}</p>
                    <p><b>Description:</b></p>
                    <p>{productData.description}</p>
                    <button className="addToCartBttn" onClick={() => addToCart(id)}>
                        Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
                    </button>
                </div>
            </div>
        </div>

    </div>
  );
};
