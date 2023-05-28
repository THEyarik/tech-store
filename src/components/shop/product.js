import React, { useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {addItemToOrder, getFileDataProduct} from "../../utils/hooks/hooks";


export const Product = ({product ,getShowModalState,role}) => {

    const [productPhoto, setProductPhoto] = useState("");
    const userInfo =JSON.parse(localStorage.getItem("userInfo")) ;

    const checkIsLoginForAddItemOrder = (product) =>{
        if(userInfo === null){
            getShowModalState(true);
        }else{
            addItemToOrder(product)
        }
    }

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

            <Link to={(userInfo === null)?'#':`/product/${(product)? product.id:""}`} className="product-link" onClick={()=>{
                (userInfo === null)?getShowModalState(true): getShowModalState(false)
            }}>
                <img className="product__image" src={`${productPhoto}`}/>
                <div className="description">
                    <div>
                        <p>{(product)? product.name :""}</p>
                    </div>
                    <p> ${(product)? product.unitPrice :" "}</p>
                </div>
            </Link>
            {(role !== "admin")?
                <button className="addToCartBttn" onClick={() => checkIsLoginForAddItemOrder(product)}>
                    Add To Cart
                </button>: ""
            }

        </div>
    );
};


