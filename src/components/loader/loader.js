
import "./loader.css"
import animation from '../../assets/animation/ZCb9jt1hzR.json'
import lottie from "lottie-web";
import React, { useEffect, createRef } from "react";


function Loader() {

    let animationContainer = createRef()

    lottie.loadAnimation({
        container: animationContainer.current, // current instance of our container!
        animationData: animation, // animation file!
        renderer: "svg",
        loop: true,
        autoplay: true
    });
    useEffect(() => {
        const anim = lottie.loadAnimation({
            container: animationContainer.current,
            renderer: "svg",
            loop: true,
            autoplay: true,
            animationData: animation
        });
        return () => anim.destroy(); // optional clean up for unmounting
    }, []);
    return (
        <div className="loader">
            <div className="loader__container" >
                    <div className="animation" ref={animationContainer}></div>
            </div>

        </div>
    );
}

export default Loader;

