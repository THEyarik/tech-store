import React, {useEffect, useState} from 'react';
import {redirect, useNavigate} from "react-router-dom";

import "./login-registration.css";
import {createOrder, postData} from "../../utils/hooks/hooks";

function LoginRegistration({getRole}) {
    const [dateNewClient, setDateNewClient] = useState();
    const [loginDate, setLoginDate] = useState();
    const [role, setRole] = useState('client');
    const [currentForm, setCurrentForm] = useState('signUp')
    const navigate = useNavigate()

    const handleChangeRole = () => {
        if (role === "client") {
            setRole('admin')
        } else
            setRole("client")
    }


    const login = (e) => {
        postData(`authentication/login/${role}`, loginDate).then(
            (res) => {
                getRole(role);
                createOrder(`orders/create` ,res.data.token);
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("role", role);
                localStorage.setItem("userInfo", JSON.stringify(res.data));
                navigate(`/`)
            })
    }
    const loginChange = (e) => {
        setLoginDate(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const handleChange = (e) => {
        setDateNewClient(prev => ({...prev, [e.target.name]: e.target.value}))
    }
    const addNewClient = async () => {
        if (dateNewClient.email == "" || dateNewClient.firstName == "" || dateNewClient.lastName == "" || dateNewClient.password == "") {
            alert('Заповніть всі поля')
        } else
            postData(`${role}s/register`, dateNewClient).then(res => {
                setCurrentForm("login");
            })
    }
    const formSwitchButton = () => {
        const signUp = document.querySelector('.signup');
        const login = document.querySelector('.login');
        if (currentForm === "signUp") {
            login.classList.add("slide-up");
            signUp.classList.remove('slide-up')
        } else {
            login.classList.remove("slide-up");
            signUp.classList.add('slide-up')
        }
    }
    useEffect(() => {
        formSwitchButton()
    }, [currentForm])
    return (
        <div>

            <div className="login__registration">
                <div className="container login__registration__container ">

                    <div className="form-structor">
                        <div className="login__role" onClick={handleChangeRole}>
                            {(role === "client") ? "as Client" : "as Admin"}
                        </div>
                        <form action='#'>
                            <div className="signup" onClick={() => {
                                setCurrentForm("signUp");
                            }}>
                                <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                                <div className="form-holder">
                                    <input type="text" className="input" placeholder="Last Name" name="lastName"
                                           onChange={handleChange}/>
                                    <input type="text" className="input" placeholder="First Name" name="firstName"
                                           onChange={handleChange}/>
                                    <input type="email" className="input" placeholder="Email" name="email"
                                           onChange={handleChange}/>
                                    <input type="password" className="input" placeholder="Password"
                                           name="password" onChange={handleChange}/>
                                </div>
                                <button className="submit-btn" onClick={addNewClient}>Sign up</button>
                            </div>
                        </form>

                        <form action='#'>
                            <div className="login slide-up" onClick={() => {
                                setCurrentForm("login");
                            }}>
                                <div className="center">
                                    <h2 className="form-title" id="login"><span>or</span>Log in</h2>
                                    <div className="form-holder">
                                        <input type="email" className="input" placeholder="Email"
                                               name="username" onChange={loginChange}/>
                                        <input type="password" className="input" placeholder="Password"
                                               name="password" onChange={loginChange}/>
                                    </div>
                                    <button className="submit-btn" onClick={login}>Log in</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default LoginRegistration;