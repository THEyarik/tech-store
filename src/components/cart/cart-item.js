import React, {useEffect, useState} from "react";
import {deleteData, getFileDataProduct, postData, putData} from "../../utils/hooks/hooks";

export const CartItem = ({product, getUpdatePageState}) => {

    const [productPhoto, setProductPhoto] = useState("");
    const [productCount, setProductCount] = useState(product.itemQty);

    const deleteProducts = (productInfo) => {
        deleteData(`orders/${productInfo.orderId}/items/${productInfo.itemId}`).then(res => {
            getUpdatePageState(true);
        })

    }
    const addItemQty = (productInfo) => {
        putData(`orders/${productInfo.orderId}/items/${productInfo.itemId}`, {
            "productId": productInfo.id,
            "qty": productInfo.itemQty + 1,
            "comment": productInfo.description
        }).then(res => {
            getUpdatePageState(true);
        })

    }
    const deleteItemQty = (productInfo) => {

        putData(`orders/${productInfo.orderId}/items/${productInfo.itemId}`, {
            "productId": productInfo.id,
            "qty": productInfo.itemQty - 1,
            "comment": productInfo.description
        }).then(res => {
            getUpdatePageState(true);
        })

    }
    useEffect(() => {
        if (product.images.length !== 0) {
            getFileDataProduct(`products/${product.id}/images/${product.images[0].id}`).then(blob => {
                const imageUrl = URL.createObjectURL(blob)
                setProductPhoto(imageUrl);
            })
        }
    }, [])

    return (
        <div className="cartItem">

            <img className="product__image" src={productPhoto}/>
            <div className="description">
                <h2>{product.name}</h2>
                <p>
                    <b>{product.description}</b>
                </p>
                <p> Price: {product.unitPrice}</p>
                <div className="countHandler">
                    <button onClick={() => {
                        if ((product.itemQty - 1) === 0) {
                            deleteProducts(product);
                        } else
                            deleteItemQty(product)
                    }
                    }> -
                    </button>
                    <input value={productCount} onChange={(e) => {
                        setProductCount(e.target.value)
                    }}/>
                    <button onClick={() => {
                        addItemQty(product)
                    }}> +
                    </button>
                </div>

            </div>
            <p className="delete_product">
                <svg className="delete_product__icon"
                     onClick={() => {
                         deleteProducts(product)
                     }}
                     xmlns="http://www.w3.org/2000/svg"
                     width="800"
                     height="800"
                     fill="none"
                     stroke="#000"
                     strokeWidth="3"
                     viewBox="0 0 64 64"
                >
                    <path d="M8.06 8.06L55.41 55.94"></path>
                    <path d="M55.94 8.06L8.59 55.94"></path>
                </svg>
            </p>
        </div>
    );
};