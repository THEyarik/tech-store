import React, {useEffect, useState} from "react";
import {CartItem} from "./cart-item";
import {useNavigate} from "react-router-dom";

import "./cart.css";
import {getData} from "../../utils/hooks/hooks";

export const Cart = () => {
    const [productsData, setProductsData] = useState([]);
    const navigate = useNavigate();
    const activeUserId = localStorage.getItem("userId");

    const getAllOrdersData = () => {
        if( activeUserId){
            getData(`orders/clients/${activeUserId}`).then(res =>{
                res.map(order =>{
                    getData(`orders/${order.id}`).then(res => {
                        res.items.forEach(product => {
                            getData(`products/${product.productId}`).then(currentProduct => {
                                currentProduct.orderId = order.id;
                                currentProduct.itemId = product.id;
                                currentProduct.itemQty = product.qty;
                                currentProduct.orderItemsAmount = res.items.length;
                                setProductsData((prevProduct) => [...prevProduct, currentProduct]);
                            })
                        })
                    })
                })
            })
        }
    }
    const getUpdatePageState = (boolean) => {
        if (boolean === true) {
            setProductsData([]);
            getAllOrdersData();
        }
    }
    const randomId = () => {
        return Math.round(Math.random() * (1000 - 1) + 1);
    }
    function sortItems(a, b) {
        if (a.id < b.id) {
            return -1;
        }
        if (a.id > b.id) {
            return 1;
        }
        return 0;
    }

    useEffect(() => {
        getAllOrdersData();
    }, [])

    return (
        <div className="cart">
            <div className="cart">
                {
                    productsData.sort(sortItems).map(product => {
                        return (<CartItem product={product} key={randomId()} getUpdatePageState={getUpdatePageState}/>)
                    })
                }
                {(productsData.length > 0) ? (
                    <div className="checkout">

                        <div className="buttons">
                            <button onClick={() => navigate("/")}>Continue Shopping</button>
                            <button >
                                Checkout
                            </button>
                        </div>
                    </div>

                ) : (
                    <h1 className="empty__title"> Your Shopping Cart is Empty</h1>
                )}
            </div>
        </div>
    );
};