import React, {useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {Swiper, SwiperSlide} from 'swiper/react';
import "./productDetails.css";
import 'swiper/css';
import "swiper/css/navigation";
import {Navigation} from "swiper";

import {addItemToOrder, getData, getFileDataProduct, postData} from "../../utils/hooks/hooks";

export const ProductDetails = () => {
    const {id} = useParams();
    const [productData, setProductData] = useState([]);
    const [productDocument, setProductDocument] = useState();
    const [productImage, setProductsImage] = useState([]);

    const getAmountImageForCurrentProduct = (id) => {
        getData(`products/${id}`).then(res => {
            getAllImageForCurrentProduct(res.images, id)
        })
    }
    const getAllImageForCurrentProduct = (imageArray, id) => {
        setProductsImage([]);
        if (imageArray.length !== 0) {
            imageArray.map(image => {
                getFileDataProduct(`products/${id}/images/${image.id}`).then(blob => {
                    const imageUrl = URL.createObjectURL(blob)
                    setProductsImage((prevPoductImage) => [...prevPoductImage, {
                        "id": image.id,
                        "name": image.name,
                        "imageUrl": imageUrl
                    }])
                })
            })
        }
    }
    const getFileData = () => {
        getData(`products/${id}`).then(res => {
            setProductData(res);
            getAmountImageForCurrentProduct(res.id);
            if (res.documents.length !== 0) {
                getFileDataProduct(`products/${res.id}/documents/${res.documents[0].id}`).then(blob => {
                    const documentUrl = URL.createObjectURL(blob)
                    setProductDocument(documentUrl);
                })
            }
        })
    }


    useEffect(() => {
        getFileData();

    }, [])

    return (
        <div className="product-container">
            <div className="product-item">
                <div className="product-image-container">
                    <Swiper className="swiper"
                            navigation={true}
                            modules={[Navigation]}
                    >
                        {
                            (productImage.length > 0)?
                            productImage.map(img => {
                                return <SwiperSlide key={img.id} className="card ">
                                    <div className="card-image">
                                        <img src={img.imageUrl} className=" card-img"/>
                                    </div>
                                </SwiperSlide>

                            }) : ""
                        }


                    </Swiper>

                </div>
                <div className="product-details-container">
                    <h1 className="product-name">{productData.name}</h1>
                    <div className="product-details">
                        <p><b>ID:</b> {productData.id}</p>
                        <p><b>Price:</b> {productData.unitPrice}</p>
                        <p><b>Model:</b> {productData.model}</p>
                        <p><b>Country:</b> {productData.producingCountry}</p>
                        <p><b>Description:</b>{productData.description}</p>
                        {(!(productDocument === undefined)) ?
                            <a className="addToCartBttn" href={productDocument}>Download document</a>
                            : ""
                        }

                        <button className="addToCartBttn" onClick={() => addItemToOrder(productData)}>
                            Add To Cart
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
};
