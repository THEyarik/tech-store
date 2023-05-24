import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "./clientPage.css";
import Order from './Order/Order';

function ClientPage() {
    let [oredrsClients, setOredrsClients] = useState([]);
    console.log(`Bearer ${localStorage.getItem("token")}`);
    useEffect(() => {
        const fecthAllOrders = async () => {
            
            const res = await Axios.get("http://localhost:39510/orders/all", {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`,
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