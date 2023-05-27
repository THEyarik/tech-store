import React, {useEffect, useState} from 'react';
import "../admin.css"
import {deleteData, getData, postData, putData} from "../../../utils/hooks/hooks";
import {useForm} from "react-hook-form";

function AdminsManage({showDashboard}) {

    const [adminsData, setAdminsData] = useState([]);
    const [createStatus, setCreateStatus] = useState(false);
    const [updatePage, setUpdatePage] = useState(false);
    const {register, getValues, setValue} = useForm();

    const cleanInputValues = () => {
        setValue('firstName' , "");
        setValue('lastName' , "");
        setValue('email' , "");
        setValue('password' , "");
    }
    const getAdminsData = () => {
        getData("admins/all").then(res => {
            setAdminsData(res)
        })
    }
    const deleteCurrentAdmins = (id) => {
        deleteData(`admins/delete/${id}`)
            .then(response => {
                getAdminsData();
                setUpdatePage(true);
            });
    }
    const saveAdminsData = () => {
        postData("admins/register", {
            "firstName": getValues('firstName'),
            "lastName": getValues('lastName'),
            "email": getValues('email'),
            "password": getValues('password'),
            "userName": getValues('email')
        }).then(res => {
                getAdminsData();
                setCreateStatus(false)
        })
    }


    
    useEffect(() => {
        getAdminsData();
        showDashboard(createStatus)
    }, [createStatus, updatePage])

    return (
        <div className="dashboard">
            <h2 className="dashboard__title">
                admin/Admins
            </h2>
            <div className="main__dashboard__content">
                <div className="dashboard__navigation">
                    <p className="dashboard__item__list">
                        Admins List
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
                        adminsData.map((admin) => {

                            return (
                                <div className="dashboard__list__item" key={admin.id}>
                                    <div className="dashboard__list__item__content">
                                        <p className="dashboard__list__item__id">
                                            id: {admin.id}
                                        </p>
                                        <p className="dashboard__list__item__name">
                                            Name: {admin.userName}

                                        </p>
                                    </div>
                                    <div className="dashboard__list__item__action__box">
                                        <div className="dashboard__list__item__action"
                                             onClick={() => deleteCurrentAdmins(admin.id)}>
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
                    Adding  admin
                </div>
                <div className="dashboard__create__form__body">
                    <div className="dashboard__create__form__item">
                        <div className="fields__table">
                            <p className="field__name">
                               First Name:
                            </p>
                            <input  type="text" className="field__input"
                                   {...register("firstName")}    />
                        </div>
                        <div className="fields__table">
                            <p className="field__name">
                               Last name:
                            </p>
                            <input  type="text" className="field__input"
                                   {...register("lastName")}  />
                        </div>
                        <div className="fields__table">
                            <p className="field__name">
                                Email:
                            </p>
                            <input  type="text" className="field__input"
                                   {...register("email")} />
                        </div>
                        <div className="fields__table">
                            <p className="field__name">
                                Password:
                            </p>
                            <input  type="text" className="field__input"
                                   {...register("password")} />
                        </div>
                        <div className="field__btn__box">
                            <div className="field__btn"
                                 onClick={() => {
                                     saveAdminsData();
                                     cleanInputValues();
                                 }}>Add </div>
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

export default AdminsManage;