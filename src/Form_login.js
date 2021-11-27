import './Form.css';
import React from 'react';
import Validate from './login_validate'
import Handle_login from './Login_handle'

const Login_form = () => {

        const { handleChange, handlesubmit, State, error_message } = Handle_login(Validate);

        return (

                <
                div className = "form-content" >
                <
                form onSubmit = { handlesubmit }
                className = 'form-container'
                noValidate >
                <
                h1 > Login < /h1>

                <
                div className = 'form-inputs' >
                <
                label className = 'label-form' > < b > Username < /b>  </label > < br / >
                <
                input type = "text"
                name = 'username'
                value = { State.username }
                onChange = { handleChange }
                placeholder = 'Enter your username' / > < br / > {
                    error_message.username && < p > { error_message.username } < /p>}  <
                    /div > 

                    <
                    div className = 'form-inputs' >
                    <
                    label className = 'label-form' > < b > Password < /b>  </label > < br / >
                    <
                    input type = "password"
                    name = 'password'
                    value = { State.password }
                    onChange = { handleChange }
                    placeholder = 'Enter your password' / > < br / > {
                        error_message.password && < p > { error_message.password } < /p>}   <
                        /div > 


                        <
                        button className = 'form-input-button'
                        type = 'submit' > Login < /button> <br/ > { /* <span className = 'form-input-submit' > Already have submitted ? Login <a href = '#'> here </a> </span> */ }

                        <
                        /form>

                        <
                        /div>

                    );

                };


                export default Login_form;