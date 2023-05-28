import React, {useEffect, useState} from 'react';
import Hero from "../hero/hero";
import {Shop} from "../shop/shop";
import Loader from "../loader/loader";

function Homepage({getShowModalState,role}) {
    const [showLoaderState, setShowLoaderState] = useState(true);


    setTimeout(() => {
        setShowLoaderState(false);
    }, 1500)

    useEffect(() => {

    }, [showLoaderState])
    if (showLoaderState) {
        return <Loader/>;
    }
    return (
        <div>
            <Hero/>
            <Shop getShowModalState={getShowModalState} role={role}/>
        </div>
    );
}

export default Homepage;