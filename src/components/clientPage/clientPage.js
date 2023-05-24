import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "./clientPage.css";
import Order from './Order/Order';

function ClientPage() {
    let [oredrsClients, setOredrsClients] = useState([]);
    useEffect(() => {
        const fecthAllOrders = async () => {
            
            const res = await Axios.get("http://localhost:39510/orders/all", {
                headers: {
                    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6InN0cmluZyIsIm5iZiI6MTY4NDg2Mzc4NSwiZXhwIjoxNjg0OTUwMTg1LCJpYXQiOjE2ODQ4NjM3ODV9.LjMqlgLRnRkIlW-a3ncUoIxD2vbVmOXv7oc_dCJq4kk',
                    'Content-Type': 'text/plain',
                }
            })
            setOredrsClients(res.data);
        }
        fecthAllOrders()
    }, [])
    console.log(oredrsClients[0]);
    return (
        <section className="client">
            <div className="clientContainer">
                <div className="dataClient">
                    <div className="clientName">HUIDSH</div>
                    <div className="email">FROREHGIERH</div>
                </div>
                <div className="orders">
                    <h1>All orders </h1>
                    {
                        oredrsClients.map((item,index)=><Order key={index} orderItem={item} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default ClientPage