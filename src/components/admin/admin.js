import React, {useState} from 'react';
import "./admin.css"
import axios, {get} from "axios";

function Admin(props) {

const [company , setCompany] = useState("");
    let config = {
        headers: {
            'Authorization': 'Bearer',
            'Content-Type': 'application/json',
        }
    }

const  getCompany = (e) => {
    setCompany(e.target.value);
}

const saveCompany = async()=>{
    try {
        const resp = await axios.post('http://localhost:39510/companies',
            {
                "name": company
            },
            {withCredentials: true},
        );
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}


    return (
        <div className="admin">
            <div className="admin__container">
                <div className="admin__body">
                    
                    <div className="admin__item">
                        <p className="admin__field__name">
                            Компанія:
                        </p>
                        <input type="text" className="admin__field__input" onChange={getCompany}/>
                        <button className="admin__btn" onClick={saveCompany}>Додати Компанію</button>
                    </div>

                    
                </div>
            </div>
        </div>
    );
}

export default Admin;