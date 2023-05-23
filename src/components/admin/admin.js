import React, {useState} from 'react';
import "./admin.css"
import axios, {get} from "axios";

import {useForm} from "react-hook-form";

import {Cart} from "../cart/cart";
import {ProductDetails} from "../productDetails/productDetails";
import Companies from "./companies/companies";
import Products from "./products/products";


function Admin(props) {


    const [currentTemplate, setCurrentTemplate] = useState('companies')


    let config = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5iZiI6MTY4NDc3NzAyNSwiZXhwIjoxNjg0ODYzNDI0LCJpYXQiOjE2ODQ3NzcwMjV9.wHGD6vFE-xmTKniH3VL4bI1JRJYPDCZJQX7CDsW7iKE',
            'Content-Type': 'application/json',
        }
    }

    const handleCurrentTemplate = (template) => {
        setCurrentTemplate(template);
    }


    return (
        <div className="admin">
            <div className="admin__container">

                <div className="admin__left__side-bar">

                    <div className="admin__left__side-bar__item">
                        <div className="nav__link" onClick={() => handleCurrentTemplate("companies")}>
                            Companies
                        </div>
                    </div>
                    <div className="admin__left__side-bar__item">
                        <div className="nav__link" onClick={() => handleCurrentTemplate("products")}>
                            Products
                        </div>
                    </div>

                </div>
                {
                    (currentTemplate === "companies") ? <Companies config={config}/> :

                        (currentTemplate === "products") ? <Products config={config}/> : ""
                }


            </div>
        </div>
    );
}

export default Admin;