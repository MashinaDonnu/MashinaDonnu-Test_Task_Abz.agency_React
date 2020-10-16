import React from 'react';
import './Register.scss'
import {Form} from "../Form/Form";

export const Register = props => {

    return (
        <section className="register" id="register">
                <div className="register-head" >
                    <h1>Register to get a work</h1>
                </div>
            <div className="register-container">
                <p className="attention">Attention! After successful registration and alert, update the list of users in the block from the top</p>
                <Form />
            </div>
        </section>
    )
}
