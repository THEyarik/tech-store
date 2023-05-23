import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../admin.css"

function Companies({config}) {

    const [companiesData, setCompaniesData] = useState([]);
    const [createStatus, setCreateStatus] = useState(false);
    const [updatePage, setUpdatePage] = useState(false);
    const [currentCompanyDataForEdit, setCurrentCompanyDataForEdit] = useState([]);
    const [companiesInput, setCompaniesInput] = useState((currentCompanyDataForEdit.name) ? currentCompanyDataForEdit.name : "");
    const [editTableStatus, setEditTableStatus] = useState(false);

    const handleInputCompaniesInput = (e) => {
        setCompaniesInput(e.target.value)

    }
    const getCompaniesData = async () => {
        try {
            const resp = await axios.get('http://localhost:39510/companies/all',
                config,
            ).then(response => {
                // Handle response
                setCompaniesData(response.data);

            });
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    const deleteCurrentCompany = async (id) => {
        try {
            const resp = await axios.delete(`http://localhost:39510/companies/${id}`,
                config,
            ).then(response => {
                if (response.status === 204) {
                    getCompaniesData();
                    setUpdatePage(true);

                }
            });
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }

    }
    const saveCompaniesData = async () => {
        try {
            const resp = await axios.post('http://localhost:39510/companies',
                JSON.stringify({
                    "name": companiesInput
                }),
                config,
            ).then(response => {
                if (response.status === 200) {
                    getCompaniesData();
                    setCreateStatus(false)
                }
            });

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }

    }
    const putCompaniesData = async () => {
        try {
            const resp = await axios.put(`http://localhost:39510/companies/${currentCompanyDataForEdit.id}`,
                JSON.stringify({
                    "name": companiesInput
                }),
                config,
            ).then(response => {
                if (response.status === 200) {
                    getCompaniesData();
                    setCreateStatus(false)
                }
            });

        } catch (err) {
            // Handle Error Here
            console.error(err);
        }


    }
    const handleSaveCompaniesDataControllers = () => {
        if (editTableStatus === false) {
            saveCompaniesData();
        } else {
            putCompaniesData();
        }

    }
    const getCurrentCompanyDataForEdit = async (id) => {

        try {
            const resp = await axios.get(`http://localhost:39510/companies/${Number(id)}`,
                config,
            ).then(response => {
                // Handle response
                setCurrentCompanyDataForEdit(response.data);

                setCompaniesInput(response.data.name)
            });
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }
    }
    const showDashboard = () => {
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

    useEffect(() => {
        getCompaniesData();
        showDashboard()
    }, [createStatus, updatePage, editTableStatus])

    return (
        <div className="dashboard">
            <h2 className="dashboard__title">
                admin/Companies
            </h2>
            <div className="main__dashboard__content">
                <div className="dashboard__navigation">
                    <p className="dashboard__item__list">
                        Companies List
                    </p>
                    <div className="dashboard__navigation__action">
                        <p className="dashboard__item__create" onClick={() => {
                            setCreateStatus(true)
                        }}>
                            +Add
                        </p>

                    </div>

                </div>

                <div className="dashboard__list">
                    {
                        companiesData.map((company) => {

                            return (
                                <div className="dashboard__list__item" key={company.id}>
                                    <div className="dashboard__list__item__content">
                                        <p className="dashboard__list__item__id">
                                            id: {company.id}
                                        </p>
                                        <p className="dashboard__list__item__name">
                                            Name: {company.name}
                                        </p>
                                    </div>
                                    <div className="dashboard__list__item__action__box">
                                        <div className="dashboard__list__item__action" onClick={() => {
                                            setCreateStatus(true);
                                            getCurrentCompanyDataForEdit(company.id);
                                            setEditTableStatus(true);
                                        }}>
                                            Edit
                                        </div>
                                        <div className="dashboard__list__item__action"
                                             onClick={() => deleteCurrentCompany(company.id)}>
                                            Delete
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }


                </div>
            </div>


            <div className="dashboard__create__form hide">
                <div className="dashboard__create__form__title">
                    Adding Companies
                </div>
                <div className="dashboard__create__form__body">
                    <div className="dashboard__create__form__item">
                        <div className="fields__table">
                            <p className="field__name">
                                Company:
                            </p>
                            <input value={companiesInput} type="text" className="field__input"
                                   onChange={(e) => handleInputCompaniesInput(e)}/>
                        </div>
                        <div className="field__btn__box">
                            <div className="field__btn"
                                 onClick={handleSaveCompaniesDataControllers}>{(setEditTableStatus === false) ? "Add" : "Edit"} </div>
                            <div className="field__btn" onClick={() => {
                                setCreateStatus(false)
                            }}>Cancel
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Companies;