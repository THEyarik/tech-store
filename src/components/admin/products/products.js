import React, {useEffect, useState} from 'react';
import {useForm} from "react-hook-form";
import axios from "axios";
import {postData, putData, getData, deleteData, postImages} from "../../../utils/hooks/hooks";


function Products() {

    const {register, getValues, setValue} = useForm();
    const [createStatus, setCreateStatus] = useState(false);
    const [createStatusImages, setCreateStatusImages] = useState(false);
    const [companiesData, setCompaniesData] = useState([]);
    const [productsData, setProductsData] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);
    const [chosenCompanyId, setChosenCompanyId] = useState();
    const [chosenProductAddingImagesId, setChosenProductAddingImagesId] = useState();
    const [currentProductDataForEdit, setCurrentProductDataForEdit] = useState([]);
    const [editTableStatus, setEditTableStatus] = useState(false);
    //const [productImage , setProductsImage] = useState();

    const getCompaniesData = () => {
        getData("companies/all")
            .then(response => {
                // Handle response
                setCompaniesData(response);

            })
    }
    const getProductsData = () => {
        getData("products/all")
            .then(response => {
                // Handle response
                setProductsData(response);

            })
    }

    const getCurrentProductDataForEdit = (id) => {
        getData(`products/${Number(id)}`)
            .then(response => {
                // Handle response
                setCurrentProductDataForEdit(response);
                setValue("productName", response.name);
                setValue("productDescription", response.description);
                setValue("productModel", response.model);
                setValue("productPrice", response.unitPrice);
                setValue("productCount", response.unitsAvailable);
                setValue("productCountry", response.producingCountry);
                const fieldsTableSelectTitle = document.querySelector('.fields__table__select__title');
                fieldsTableSelectTitle.innerText = response.supplier.name;
                setChosenCompanyId(response.supplier.id)
            })
    }
    const deleteCurrentProduct = (id) => {
        deleteData(`products/${id}`)
            .then(response => {
                getCompaniesData();
                setUpdatePage(true);
            })
    }
    const saveProductImage = () => {
        const formData = new FormData();
        formData.append('file', getValues('productImages')[0]);
        postImages(`products/${chosenProductAddingImagesId}/images`, formData)
            .then(response => {
                setCreateStatusImages(false);
                setCreateStatus(false);
            })
    }
    const getProductInputData = () =>{
        return{
            "name": getValues("productName"),
            "description": getValues("productDescription"),
            "model": getValues("productModel"),
            "unitPrice": Number(getValues("productPrice")),
            "unitsAvailable": Number(getValues("productCount")),
            "producingCountry": getValues("productCountry"),
            "supplierId": chosenCompanyId,
        }
    }
    const saveProductInput = () => {
        postData("products",getProductInputData() ).then(response => {
            setCreateStatus(false)
        });
    }
    const putProductInput =  () => {
        putData(`products/${currentProductDataForEdit.id}`, getProductInputData()).then(response => {
            setEditTableStatus(false);
            setCreateStatus(false);
        });

    }
    const handleSaveProductDataControllers = () => {
        if (editTableStatus === false) {
            saveProductInput();
        } else {
            putProductInput();
        }
    }
    const showDashboard = () => {
        const dashboardCreateForm = document.querySelector('.dashboard__create__form');
        const mainDashboardContent = document.querySelector('.main__dashboard__content');

        const dashboardAddingImages = document.querySelector('.dashboard__adding-images__form');
        if (createStatus) {
            if (createStatusImages && createStatus) {
                mainDashboardContent.classList.add('hide')
                dashboardAddingImages.classList.remove('hide');
            } else {
                dashboardCreateForm.classList.remove('hide');
                mainDashboardContent.classList.add('hide')
            }

        } else {
            if (createStatusImages === false && createStatus === false) {
                dashboardAddingImages.classList.add('hide');
                mainDashboardContent.classList.remove('hide')
                dashboardCreateForm.classList.add('hide');
            } else {
                dashboardCreateForm.classList.add('hide');
                mainDashboardContent.classList.remove('hide')
            }

        }
    }
    const showCompanyDropdown = () => {
        const fieldsTableSelectDropdown = document.querySelector('.fields__table__select__dropdown');
        fieldsTableSelectDropdown.classList.toggle("hide")
    }
    const selectCompany = (e) => {
        const fieldsTableSelectDropdown = document.querySelector('.fields__table__select__dropdown');

        const fieldsTableSelectTitle = document.querySelector('.fields__table__select__title');

        fieldsTableSelectTitle.innerText = e.target.innerText;
        fieldsTableSelectDropdown.classList.add("hide")
    }

    useEffect(() => {
        showDashboard();
        getCompaniesData();
        getProductsData()
    }, [createStatus, updatePage, createStatusImages])


    return (
        <div className="dashboard">
            <h2 className="dashboard__title">
                admin/Products
            </h2>
            <div className="main__dashboard__content">
                <div className="dashboard__navigation">
                    <p className="dashboard__item__list">
                        Products List
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
                        productsData.map((products => {
                            return (
                                <div className="dashboard__list__item" key={products.id}>
                                    <div className="dashboard__list__item__content">
                                        <p className="dashboard__list__item__id">
                                            id: {products.id}
                                        </p>
                                        <p className="dashboard__list__item__name">
                                            Name: {products.name}
                                        </p>
                                        <p className="dashboard__list__item__name">
                                            Units available: {products.unitsAvailable}
                                        </p>
                                        <p className="dashboard__list__item__name">
                                            Country: {products.producingCountry}
                                        </p>

                                    </div>
                                    <div className="dashboard__list__item__action__box">
                                        <div className="dashboard__list__item__action" onClick={() => {
                                            setCreateStatus(true);
                                            setEditTableStatus(true);
                                            getCurrentProductDataForEdit(products.id);
                                        }}>
                                            Edit
                                        </div>
                                        <div className="dashboard__list__item__action" onClick={() => {
                                            setCreateStatusImages(true);
                                            setCreateStatus(true);
                                            setChosenProductAddingImagesId(products.id)
                                        }}>
                                            Add images
                                        </div>
                                        <div className="dashboard__list__item__action" onClick={() => {
                                            deleteCurrentProduct(products.id)
                                        }}>
                                            Delete
                                        </div>
                                    </div>

                                </div>
                            )
                        }))
                    }


                </div>
            </div>
            <div className="dashboard__adding-images__form hide">
                <div className="dashboard__create__form__title">
                    Adding Images for Product
                </div>
                <div className="dashboard__create__form__body">
                    <div className="dashboard__create__form__item">

                        <div className="fields__table">
                            <p className="field__name">
                                Image:
                            </p>
                            <input type="file"
                                   className="field__input field__input__file"  {...register("productImages")}
                                   accept=".jpg, .jpeg, .png"/>
                        </div>
                        <div className="field__btn__box">
                            <div className="field__btn" onClick={saveProductImage}>Add</div>
                            <div className="field__btn" onClick={() => {
                                setCreateStatusImages(false);
                                setCreateStatus(false);
                                setCreateStatusImages(false);
                            }}>Cancel
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            <div className="dashboard__create__form hide">
                <div className="dashboard__create__form__title">
                    Adding Products
                </div>
                <div className="dashboard__create__form__body">
                    <div className="dashboard__create__form__item">
                        <div className="fields__table">
                            <p className="field__name">
                                Name:
                            </p>
                            <input type="text" className="field__input" {...register("productName")}/>
                        </div>
                        <div className="fields__table">
                            <p className="field__name">
                                Description:
                            </p>
                            <input type="text" className="field__input" {...register("productDescription")}/>
                        </div>
                        <div className="fields__table">
                            <p className="field__name">
                                Model:
                            </p>
                            <input type="text" className="field__input" {...register("productModel")}/>
                        </div>
                        <div className="fields__table">
                            <p className="field__name">
                                Price:
                            </p>
                            <input type="text" className="field__input" {...register("productPrice")}/>
                        </div>
                        <div className="fields__table">
                            <p className="field__name">
                                Units available:
                            </p>
                            <input type="text" className="field__input" {...register("productCount")}/>
                        </div>
                        <div className="fields__table">
                            <p className="field__name">
                                Producing country:
                            </p>
                            <input type="text" className="field__input" {...register("productCountry")} />
                        </div>

                        <div className="fields__table">
                            <p className="field__name">
                                Company
                            </p>
                            <div className="fields__table__select">
                                <p className="fields__table__select__title" onClick={showCompanyDropdown}>
                                    Оберіть компанію
                                </p>
                                <div className="fields__table__select__dropdown hide" onClick={selectCompany}>
                                    {
                                        companiesData.map((company) => {

                                            return (
                                                <p className="company__select" onClick={
                                                    () => {

                                                        setChosenCompanyId(company.id)
                                                    }} key={company.id}
                                                >
                                                    {company.name}
                                                </p>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>

                        <div className="field__btn__box">
                            <div className="field__btn"
                                 onClick={handleSaveProductDataControllers}>{(editTableStatus === false) ? "Add" : "Edit"}</div>
                            <div className="field__btn" onClick={() => {
                                setCreateStatus(false);
                                setEditTableStatus(false);
                            }}>Cancel
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

export default Products;


