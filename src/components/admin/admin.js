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
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5iZiI6MTY4NDg2Mzc4NSwiZXhwIjoxNjg0OTUwMTg1LCJpYXQiOjE2ODQ4NjM3ODV9.LjMqlgLRnRkIlW-a3ncUoIxD2vbVmOXv7oc_dCJq4kk',
            'Content-Type': 'application/json',
        }
    }
    let editConfig = {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5iZiI6MTY4NDg2Mzc4NSwiZXhwIjoxNjg0OTUwMTg1LCJpYXQiOjE2ODQ4NjM3ODV9.LjMqlgLRnRkIlW-a3ncUoIxD2vbVmOXv7oc_dCJq4kk',
            'Content-Type': 'text/plain',
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

                        (currentTemplate === "products") ? <Products config={config} editConfig={editConfig}/> : ""
                }


            </div>
        </div>
    );
}

export default Admin;