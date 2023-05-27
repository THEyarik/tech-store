import React from "react";

import {Product} from "./product";
import "./shop.css";
import {useEffect, useState} from "react";
import {getData, postData} from "../../utils/hooks/hooks";


export const Shop = () => {

    const [productsData, setProductsData] = useState([]);

    useEffect(() => {

        getData("products/all").then(res => {
            setProductsData(res)
        })

    }, [])
    return (

        <div className="shop">
            <div className="shopTitle">
                <h1> Products:</h1>
            </div>

            <div className="products">
                {(productsData)? productsData.map((product) => (
                    <Product product={product} key={product.id}/>
                )):''}
            </div>
        </div>
    );
};