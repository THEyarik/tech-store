
import React from 'react';
import "../modal.css"
import {Link} from "react-router-dom";

function PleaseLoginModal({deleteAccount,getConfirmModalState}) {
    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__body">
                    <h2 className="modal__title">
                        You definitely want to delete the account
                    </h2>
                    <div className="modal__login__btn__box">
                        <Link className="modal__login__btn" to={"/login"} onClick={deleteAccount} >Confirm</Link>
                        <p className="modal__login__btn" onClick={()=>{getConfirmModalState(false)}}>Cancel</p>
                    </div>

                    <svg className="modal__cancel__icon"
                         onClick={()=>{getConfirmModalState(false)}}
                         xmlns="http://www.w3.org/2000/svg"
                         width="800"
                         height="800"
                         fill="none"
                         stroke="#000"
                         strokeWidth="3"
                         viewBox="0 0 64 64"
                    >
                        <path d="M8.06 8.06L55.41 55.94"></path>
                        <path d="M55.94 8.06L8.59 55.94"></path>
                    </svg>
                </div>

            </div>

        </div>
    );
}

export default PleaseLoginModal;