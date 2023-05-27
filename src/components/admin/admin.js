import React, {useState} from 'react';
import "./admin.css"
import axios, {get} from "axios";
import {useForm} from "react-hook-form";
import {Cart} from "../cart/cart";
import {ProductDetails} from "../productDetails/productDetails";
import AdminManageCompanies from "./companies/adminManageCompanies";
import AdminManageProducts from "./products/adminManageProducts";
import AdminsManage from "./adminManage/adminsManage";
import AdminsManageOrders from "./orders/adminsManageOrders";
import ClientsManage from "./clientsManage/clientsManage";


function Admin() {

    const [currentTemplate, setCurrentTemplate] = useState('companies')
    const handleCurrentTemplate = (template) => {
        setCurrentTemplate(template);
    }
    const showDashboard = (createStatus) => {
        if (createStatus === true) {
            const dashboardCreateForm = document.querySelector('.dashboard__create__form');
            const mainDashboardContent = document.querySelector('.main__dashboard__content');
            dashboardCreateForm.classList.remove('hide');
            mainDashboardContent.classList.add('hide')
        } else {
            const dashboardCreateForm = document.querySelector('.dashboard__create__form');
            const mainDashboardContent = document.querySelector('.main__dashboard__content');
            dashboardCreateForm.classList.add('hide');
            mainDashboardContent.classList.remove('hide')
        }
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
                    <div className="admin__left__side-bar__item">
                        <div className="nav__link" onClick={() => handleCurrentTemplate("admins")}>
                            Admins
                        </div>
                    </div>
                    <div className="admin__left__side-bar__item">
                        <div className="nav__link" onClick={() => handleCurrentTemplate("clients")}>
                            Clients
                        </div>
                    </div>
                    <div className="admin__left__side-bar__item">
                        <div className="nav__link" onClick={() => handleCurrentTemplate("orders")}>
                            Orders
                        </div>
                    </div>
                </div>

                {
                    (currentTemplate === "companies") ? <AdminManageCompanies showDashboard={showDashboard}/> :
                        (currentTemplate === "admins") ? <AdminsManage showDashboard={showDashboard} /> :
                            (currentTemplate === "clients") ? <ClientsManage/> :
                            (currentTemplate === "orders") ? <AdminsManageOrders/> :
                        (currentTemplate === "products") ? <AdminManageProducts /> : ""
                }


            </div>
        </div>
    );
}

export default Admin;