import React from 'react'
import './Loader.scss'

export const Loader = () => {

    return (
        <div className="loader-wrapper">
            <div className="lds-ripple">
                <div></div>
                <div></div>
            </div>
        </div>
    )
}
