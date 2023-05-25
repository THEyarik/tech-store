import React, { useEffect, useState } from 'react';
import {redirect, useNavigate} from "react-router-dom";

import "./login-registration.css";
import {postData, postLoginData} from "../../utils/hooks/hooks";
import {useForm} from "react-hook-form";

function LoginRegistration() {
    const [dateNewClient, setDateNewClient] = useState();
    const [loginDate, setLoginDate] = useState();
    const [role ,setRole] = useState('client')
    const navigate = useNavigate()

    const handleChangeRole = ()=>{
        if(role === "client"){
            setRole('admin')
        }else
            setRole("client")
    }

    const login =  (e) => {
        e.preventDefault()
        postLoginData(`authentication/${role}login` , loginDate).then(
            (res) => {
                localStorage.setItem("token", res.data.token);
                localStorage.setItem("username", res.data.username);
                navigate(`/${role}`)
            })
    }

    const loginChange = (e) => {
        setLoginDate(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }
    const handleChange = (e) => {
        setDateNewClient(prev => ({ ...prev, [e.target.name]: e.target.value }))

    }

    const addNewClient = async e => {
        e.preventDefault();
        if(dateNewClient.email == ""||dateNewClient.firstName == ""||dateNewClient.lastName == ""||dateNewClient.password == ""){
            alert('Заповніть всі поля')
        }
        else
            postLoginData(`${role}s/register` , dateNewClient)
    }

    const loginHandlerButton = (e) => {
        const signupBtn = document.getElementById('signup');
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')
            } else {
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }
    const signupHandlerButton = (e) => {
        const loginBtn = document.getElementById('login');
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
            if (element !== "slide-up") {
                parent.classList.add('slide-up')

            } else {
                loginBtn.parentNode.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }
    return (
        <div>

            <div className="login__registration">
                <div className="container login__registration__container ">

                    <div className="form-structor">
                        <div className="login__role" onClick={handleChangeRole}>
                            {(role==="client")? "as Client": "as Admin"}
                        </div>
                        <form action='#'>
                            <div className="signup" onClick={signupHandlerButton}>
                                <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                                <div className="form-holder">
                                    <input type="text" className="input" placeholder="Last Name" name="lastName" onChange={handleChange} />
                                    <input type="text" className="input" placeholder="First Name" name="firstName" onChange={handleChange} />
                                    <input type="email" className="input" placeholder="Email" name="email" onChange={handleChange} />
                                    <input type="password" className="input" placeholder="Password"
                                        name="password" onChange={handleChange} />
                                </div>
                                <button className="submit-btn" onClick={addNewClient} >Sign up</button>
                            </div>
                        </form>

                        <form action='#'>
                            <div className="login slide-up" onClick={loginHandlerButton}>
                                <div className="center">
                                    <h2 className="form-title" id="login"><span>or</span>Log in</h2>
                                    <div className="form-holder">
                                        <input type="email" className="input" placeholder="Email"
                                            name="username" onChange={loginChange} />
                                        <input type="password" className="input" placeholder="Password"
                                            name="password" onChange={loginChange} />
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