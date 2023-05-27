import React, {useEffect, useState} from 'react';
import "../admin.css"
import {deleteData, getData} from "../../../utils/hooks/hooks";

function ClientsManage() {

    const [clientsData, setClientsData] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);

    const getClientsData = () => {
        getData("clients/all").then(res => {
            setClientsData(res)
        })
    }

    useEffect(() => {
        getClientsData();
    }, [updatePage])

    return (
        <div className="dashboard">
            <h2 className="dashboard__title">
                admin/Clients
            </h2>
            <div className="main__dashboard__content">
                <div className="dashboard__navigation">
                    <p className="dashboard__item__list">
                        Clients List
                    </p>
                </div>

                <div className="dashboard__list">
                    {
                        clientsData.map((client) => {

                            return (
                                <div className="dashboard__list__item" key={client.id}>
                                    <div className="dashboard__list__item__content">
                                        <p className="dashboard__list__item__id">
                                            id: {client.id}
                                        </p>
                                        <p className="dashboard__list__item__name">
                                            Name: {client.firstName} {client.lastName}

                                        </p>

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

export default ClientsManage;