import React, {useEffect, useState} from 'react'
import "./clientPage.css";
import {deleteData} from "../../utils/hooks/hooks";
import {Link, useNavigate} from "react-router-dom";
import ConfirmationDeleteAccount from "../modals/confirmationDeleteAccount/confirmDeleteAccount";

function ClientPage({role}) {

    const userInfo =JSON.parse(localStorage.getItem("userInfo")) ;
    const navigate = useNavigate();
    const [confirmModalState ,setConfirmModalState] = useState(false)
    const clearCacheData = () => {
        caches.keys().then((names) => {
            names.forEach((name) => {
                caches.delete(name);
            });
        });
    };

   const getConfirmModalState = (state)=>{
        setConfirmModalState(state)
    }
    const logout = ()=>{
        localStorage.removeItem("userInfo");
        localStorage.removeItem("userId");
        localStorage.removeItem("orderId");
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        clearCacheData();
        navigate("/login")
    }

    const deleteAccount = ()=>{
        deleteData(`clients/delete`).then(res=>{
            clearCacheData();
            logout();
        })

    }
   useEffect(()=>{

   },[role])
    return (
        <div>
            {confirmModalState? <ConfirmationDeleteAccount deleteAccount={deleteAccount} getConfirmModalState={getConfirmModalState}/>:""}
            <div className="client__page">

                <div className="side__bar">
                    <p className="side__bar__title">
                        Personal Information:
                    </p>
                    <p className="side__bar_logout" onClick={logout}>
                        Logout
                    </p>
                    {(role === "admin")?
                        <Link className="side__bar_link "to={"/admin"}>Admin panel</Link>
                        : <p className="side__bar_logout" onClick={()=>setConfirmModalState(true)}>
                            Delete account
                        </p>

                    }

                </div>
                <div className="personal__info">
                    <div className="personal__info__item">
                        <p className="personal__info__text">
                            Name:
                        </p>
                        <p className="personal__info__text">
                            {userInfo.username}
                        </p>
                    </div>
                    <div className="personal__info__item">
                        <p className="personal__info__text">
                            Role:
                        </p>
                        <p className="personal__info__text">
                            {localStorage.getItem("role")}
                        </p>
                    </div>
                </div>

            </div>

        </div>


    )




}

export default ClientPage