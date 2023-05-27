import React, {useEffect, useState} from 'react';
import "../admin.css"
import {postData, putData, getData, deleteData} from "../../../utils/hooks/hooks";


function AdminManageCompanies({showDashboard}) {

    const [companiesData, setCompaniesData] = useState([]);
    const [createStatus, setCreateStatus] = useState(false);
    const [updatePage, setUpdatePage] = useState(false);
    const [currentCompanyDataForEdit, setCurrentCompanyDataForEdit] = useState([]);
    const [companiesInput, setCompaniesInput] = useState((currentCompanyDataForEdit.name) ? currentCompanyDataForEdit.name : "");
    const [editTableStatus, setEditTableStatus] = useState(false);
    const cleanInputValues = () => {
        setCompaniesInput("")
    }

    const handleInputCompaniesInput = (e) => {
        setCompaniesInput(e.target.value)
    }
    const getCompaniesData = () => {
        getData("companies/all").then(res => {
            setCompaniesData(res)
        })

    }
    const deleteCurrentCompany = (id) => {
        deleteData(`companies/${id}`)
            .then(response => {
                getCompaniesData();
                setUpdatePage(true);
            });

    }
    const saveCompaniesData = () => {
        postData("companies", {"name": companiesInput}).then(res => {
            if (res === 200) {
                getCompaniesData();
                setCreateStatus(false)
            }
        })
    }
    const putCompaniesData = () => {
        putData(`companies/${currentCompanyDataForEdit.id}`, {"name": companiesInput}).then(response => {
            if (response === 200) {
                getCompaniesData();
                setCreateStatus(false)
            }
        });

    }
    const handleSaveCompaniesDataControllers = () => {
        if (editTableStatus === false) {
            saveCompaniesData();
        } else {
            putCompaniesData();
        }

    }
    const getCurrentCompanyDataForEdit = (id) => {
        getData(`companies/${Number(id)}`)
            .then(response => {
                console.log(response)
                setCurrentCompanyDataForEdit(response);

                setCompaniesInput(response.name)
            })

    }


    useEffect(() => {
        getCompaniesData();
        showDashboard(createStatus)
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
                                 onClick={() => {
                                     handleSaveCompaniesDataControllers();
                                     cleanInputValues();
                                 }}>{(editTableStatus === false) ? "Add" : "Edit"} </div>
                            <div className="field__btn" onClick={() => {
                                setCreateStatus(false);
                                cleanInputValues();
                            }}>Cancel
                            </div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default AdminManageCompanies;