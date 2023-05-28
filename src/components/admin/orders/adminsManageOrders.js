import React, {useEffect, useState} from 'react';
import "../admin.css"
import {postData, putData, getData, deleteData} from "../../../utils/hooks/hooks";


function AdminsManageOrders() {

    const [ordersData, setOrdersData] = useState([]);


    const getOrdersData = () => {
        getData("orders/all").then(res => {
            setOrdersData(res.filter((value) => {
                return value.completedAt === null
            }))
        })
    }
    const completedActiveOrder = (id) => {
        putData(`orders/${id}/completed`).then(res => {
            getOrdersData()
        })
    }

    useEffect(() => {
        getOrdersData();
    }, [])

    return (
        <div className="dashboard">
            <h2 className="dashboard__title">
                admin/Orders
            </h2>
            <div className="main__dashboard__content">
                <div className="dashboard__navigation">
                    <p className="dashboard__item__list">
                        Orders List
                    </p>
                </div>

                <div className="dashboard__list">
                    {
                        ordersData.map((order) => {

                            return (
                                <div className="dashboard__list__item" key={order.id}>
                                    <div className="dashboard__list__item__content">
                                        <p className="dashboard__list__item__id">
                                            Client id: {order.clientId}
                                        </p>
                                        <p className="dashboard__list__item__name__orders">
                                            Ordered at: {order.orderedAt}
                                        </p>
                                    </div>
                                    <div className="dashboard__list__item__action__box">

                                        <div className="dashboard__list__item__action" onClick={() => {
                                            completedActiveOrder(order.id)
                                        }}>
                                            Completed
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>
            </div>


        </div>
    );
}

export default AdminsManageOrders;