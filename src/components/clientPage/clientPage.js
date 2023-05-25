import React, { useEffect, useState } from 'react'
import Axios from "axios"
import "./clientPage.css";
import Order from './Order/Order';
import { getData } from '../../utils/hooks/hooks';

function ClientPage() {
    let [oredrsClients, setOredrsClients] = useState([]);
    // console.log(`Bearer ${localStorage.getItem("token")}`);

    useEffect(() => {
        getData(`clients/mail/${localStorage.getItem("username")}`)
                .then(response => {
                    getData(`orders/clients/${response.id}`)
                    .then(response => {
                        setOredrsClients(response);
                    })
                })
    

    }, [])
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
                        oredrsClients.map((item, index) => <Order key={index} orderItem={item} />)
                    }
                </div>
            </div>
        </section>
    )
}

export default ClientPage