import React, {useState} from 'react';
import "./admin.css"
import axios, {get} from "axios";
import {useForm} from "react-hook-form";
import {Cart} from "../cart/cart";
import {ProductDetails} from "../productDetails/productDetails";
import Companies from "./companies/companies";
import Products from "./products/products";


function Admin() {

    const [currentTemplate, setCurrentTemplate] = useState('companies')
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
                    (currentTemplate === "companies") ? <Companies /> :

                        (currentTemplate === "products") ? <Products /> : ""
                }


            </div>
        </div>
    );
}

export default Admin;