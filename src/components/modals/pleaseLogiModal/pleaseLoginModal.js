import React from 'react';
import "../modal.css"
import {Link} from "react-router-dom";
function PleaseLoginModal({getShowModalState}) {
    return (
        <div className="modal">
            <div className="modal__container">
                <div className="modal__body">
                    <h2 className="modal__title">
                        Please Login  to continue
                    </h2>
                    <Link className="modal__login__btn" to={"/login"} onClick={()=>{getShowModalState(false)}}>Login page </Link>
                    <svg className="modal__cancel__icon"
                         onClick={()=>{getShowModalState(false)}}
                         xmlns="http://www.w3.org/2000/svg"
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