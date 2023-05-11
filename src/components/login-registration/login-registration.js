import React, {useEffect} from 'react';
import "./login-registration.css";




function LoginRegistration(props) {


    const loginHandlerButton = (e) => {
        const signupBtn = document.getElementById('signup');
        let parent = e.target.parentNode.parentNode;
        Array.from(e.target.parentNode.parentNode.classList).find((element) => {
            if(element !== "slide-up") {
                parent.classList.add('slide-up')
            }else{
                signupBtn.parentNode.classList.add('slide-up')
                parent.classList.remove('slide-up')
            }
        });
    }


    const signupHandlerButton = (e) => {
        const loginBtn = document.getElementById('login');
        let parent = e.target.parentNode;
        Array.from(e.target.parentNode.classList).find((element) => {
            if(element !== "slide-up") {
                parent.classList.add('slide-up')
            }else{
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
                            <form method="post" action="#">

                                <div className="signup" onClick={signupHandlerButton}>
                                    <h2 className="form-title" id="signup"><span>or</span>Sign up</h2>
                                    <div className="form-holder">
                                        <input type="text" className="input" placeholder="Name" name="user_name"/>
                                        <input type="email" className="input" placeholder="Email" name="user_email"/>
                                        <input type="password" className="input" placeholder="Password"
                                               name="user_password"/>
                                    </div>
                                    <button className="submit-btn" type="submit">Sign up</button>
                                </div>
                            </form>

                            <form method="post" action="#">
                                <div className="login slide-up" onClick={loginHandlerButton}>
                                    <div className="center">
                                        <h2 className="form-title" id="login"><span>or</span>Log in</h2>
                                        <div className="form-holder">
                                            <input type="email" className="input" placeholder="Email"
                                                   name="user_email"/>
                                            <input type="password" className="input" placeholder="Password"
                                                   name="user_password"/>
                                        </div>
                                        <button className="submit-btn" type="submit">Log in</button>
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