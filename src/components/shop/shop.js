import React from "react";

import {Product} from "./product";
import "./shop.css";
import {useEffect, useState} from "react";
import {getData} from "../../utils/hooks/hooks";


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
                <h1> Tech Shop</h1>
            </div>

            <div className="products">
                {(productsData)? productsData.map((product) => (
                    <Product product={product} key={product.id}/>
                )):''}
            </div>
        </div>
    );
};