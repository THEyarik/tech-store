import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {ShopContext} from "../context/shop-context";
import "./productDetails.css";
import {getData, getFileDataProduct} from "../../utils/hooks/hooks";

export const ProductDetails = () => {
    const {id} = useParams();
    const {addToCart, cartItems} = useContext(ShopContext);
    const [productData, setProductData] = useState([]);
    const [productPhoto, setProductPhoto] = useState("");
    const [productDocument, setProductDocument] = useState();
    const cartItemCount = cartItems[id];
    //
    useEffect(() => {

        getData(`products/${id}`).then(res => {
            setProductData(res)
            if(res.images.length !== 0){
                getFileDataProduct(`products/${res.id}/images/${res.images[0].id}`).then(blob => {
                    const imageUrl = URL.createObjectURL(blob)
                    setProductPhoto(imageUrl);
                })
            }
            if(res.documents.length !== 0){
                getFileDataProduct(`products/${res.id}/documents/${res.documents[0].id}`).then(blob => {
                    const documentUrl = URL.createObjectURL(blob)
                    setProductDocument(documentUrl);
                })
            }
        })

    }, [])
    console.log()
    return (
        <div className="product-container">
            <div className="product-item">
                <div className="product-image-container">
                    <img src={productPhoto} className="product-image"/>
                </div>
                <div className="product-details-container">
                    <h1 className="product-name">{productData.name}</h1>
                    <div className="product-details">
                        <p><b>ID:</b> {productData.id}</p>
                        <p><b>Price:</b> {productData.unitPrice}</p>
                        <p><b>Model:</b> {productData.model}</p>
                        <p><b>Country:</b> {productData.producingCountry}</p>
                        <p><b>Description:</b>{productData.description}</p>
                        {(!(productDocument === undefined))?
                            <a className="addToCartBttn" href={productDocument}>Download document</a>
                            : ""
                        }

                        <button className="addToCartBttn" onClick={() => addToCart(id)}>
                            Add To Cart {cartItemCount > 0 && <> ({cartItemCount})</>}
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};
