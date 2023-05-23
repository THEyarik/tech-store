import React, {useEffect, useState} from 'react';
import axios from "axios";
import "../admin.css"

function Companies({config}) {
    const [companiesInput, setCompaniesInput] = useState("");
    const [companiesData, setCompaniesData] = useState([]);
    const [createStatus , setCreateStatus] = useState(false);
    const [updatePage , setUpdatePage] = useState(false);
    const handleInputCompaniesInput = (e) => {
        setCompaniesInput(e.target.value);
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
    const deleteCurrentCompany = async (id) =>{
        try {
            const resp = await axios.delete(`http://localhost:39510/companies/${id}`,
                config,
            ).then(response => {
                if(response.status === 204){
                    getCompaniesData();
                    setUpdatePage(true);
                    console.log(response.status)
                }
            });
        } catch (err) {
            // Handle Error Here
            console.error(err);
        }

    }
    const saveCompaniesInput = async () => {
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

   const showDashboard = ()=>{
        if(createStatus === true){
            const dashboardCreateForm = document.querySelector('.dashboard__create__form');
            const mainDashboardContent = document.querySelector('.main__dashboard__content');
            dashboardCreateForm.classList.remove('hide');
            mainDashboardContent.classList.add('hide')
        }else{
            const dashboardCreateForm = document.querySelector('.dashboard__create__form');
            const mainDashboardContent = document.querySelector('.main__dashboard__content');
            dashboardCreateForm.classList.add('hide');
            mainDashboardContent.classList.remove('hide')
        }
   }

   useEffect(()=>{
       getCompaniesData();
       showDashboard()
   },[createStatus,updatePage])

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
                        <p className="dashboard__item__create" onClick={()=>{setCreateStatus(true)}}>
                            +Add
                        </p>

                    </div>

                </div>

                <div className="dashboard__list">
                    {
                        companiesData.map((company)=>{

                            return(
                                <div className="dashboard__list__item" key={company.id}>
                                    <div className="dashboard__list__item__content">
                                        <p className="dashboard__list__item__id">
                                            id: {company.id}
                                        </p>
                                        <p className="dashboard__list__item__name">
                                            Name: {company.name}
                                        </p>
                                    </div>
                                    <div className="dashboard__list__item__action" onClick={()=>deleteCurrentCompany(company.id)}>
                                        Delete
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
                            <input type="text" className="field__input" onChange={handleInputCompaniesInput}/>
                        </div>
                        <div className="field__btn__box">
                            <div className="field__btn" onClick={saveCompaniesInput}>Add</div>
                            <div className="field__btn" onClick={()=>{setCreateStatus(false)}}>Cancel</div>
                        </div>

                    </div>
                </div>
            </div>

        </div>
    );
}

export default Companies;