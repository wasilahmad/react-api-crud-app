import React from 'react';
import './loader.component.css';

const Loader = ({isLoading}) => {
    return (
        isLoading ? (<div className="overlay">
                <div className="lds-facebook">
                    <div></div>
                    <div></div>
                    <div></div>
                </div>
            </div>) : null
    )
}

export default Loader;
