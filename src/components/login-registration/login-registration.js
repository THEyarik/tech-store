import React, { useEffect, useState } from 'react';
import Axios from "axios"
import "./login-registration.css";



function LoginRegistration() {
    const [dateNewClient, setDateNewClient] = useState();

    const handleChange = (e) => {
        setDateNewClient(prev => ({ ...prev, [e.target.name]: e.target.value }))
        console.log(dateNewClient)
    }
    const addNewClient = async e => {
        e.preventDefault();

        let k = Object.values(dateNewClient.lastName
            , dateNewClient.name, dateNewClient.password)
        if (k[0] == "" || k[1] == "" || k[2] == "")
            return;
        await Axios.post("http://localhost:39510/clients/register", dateNewClient)
            .then((res) => {
                console.log("Posting data :", res);
                console.log("well done")
                // eslint-disable-next-line no-restricted-globals
                //history.push("/*");
            })
            .catch((err) => console.log(err));

        // navigate("/")
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
                        <form >
                            <div className="signup" onClick={signupHandlerButton}>
                                <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                                <div className="form-holder">
                                    <input type="text" className="input" placeholder="lastName" name="lastName" onChange={handleChange} />
                                    <input type="text" className="input" placeholder="firstName" name="firstName" onChange={handleChange} />
                                    <input type="email" className="input" placeholder="Email" name="email" onChange={handleChange} />
                                    <input type="password" className="input" placeholder="Password"
                                        name="password" onChange={handleChange} />
                                </div>
                                <button className="submit-btn" onClick={addNewClient} >Sign up</button>
                            </div>
                        </form>

                        <form >
                            <div className="login slide-up" onClick={loginHandlerButton}>
                                <div className="center">
                                    <h2 className="form-title" id="login"><span>or</span>Log in</h2>
                                    <div className="form-holder">
                                        <input type="email" className="input" placeholder="Email"
                                            name="user_email" />
                                        <input type="password" className="input" placeholder="Password"
                                            name="user_password" />
                                    </div>
                                    <button className="submit-btn">Log in</button>
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