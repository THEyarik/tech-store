import React, {useContext, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {addItemToOrder, getFileDataProduct} from "../../utils/hooks/hooks";


export const Product = ({product}) => {

    const [productPhoto, setProductPhoto] = useState("");



    useEffect(() => {
        if (product.images.length !== 0){
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
            <button className="addToCartBttn" onClick={() => addItemToOrder(product)}>
                Add To Cart
            </button>
        </div>
    );
};


