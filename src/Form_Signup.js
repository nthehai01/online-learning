import React from 'react';
import './Form.css';
import Validate from './signup_validate'
import Custom_form from './Form_handle';
import Login_form from './Form_login'
const Sign_up_form = ({ submitted_data }) => {

        const { handleChange, handlesubmit, State, error_message } = Custom_form(submitted_data, Validate);

        return ( <
                div className = "form-content" >
                <
                form onSubmit = { handlesubmit }
                className = 'form-container'
                noValidate >
                <
                h1 > Sign Up < /h1> <
                div className = 'form-inputs' >
                <
                label className = 'label-form' > < b > Fullname < /b></label > < br / >
                <
                input type = "text"
                name = 'Fullname'
                value = { State.Fullname }
                onChange = { handleChange }
                placeholder = 'Enter your fullname' / > < br / > {
                    error_message.Fullname && < p > { error_message.Fullname } < /p>}  <
                    /div >  <
                    div className = 'form-inputs' >
                    <
                    label className = 'label-form' > < b > Phone < /b>  </label > < br / >
                    <
                    input type = "text"
                    name = 'phone'
                    value = { State.phone }
                    onChange = { handleChange }
                    placeholder = 'Enter your phone' / > < br / > {
                        error_message.phone && < p > { error_message.phone } < /p>}  <
                        /div >  <
                        div className = 'form-inputs' >
                        <
                        label className = 'label-form' > < b > Username < /b>  </label > < br / >
                        <
                        input type = "text"
                        name = 'Username'
                        value = { State.Username }
                        onChange = { handleChange }
                        placeholder = 'Enter your username' / > < br / > {
                            error_message.Username && < p > { error_message.Username } < /p>}  <
                            /div >  <
                            div className = 'form-inputs' >
                            <
                            label className = 'label-form' > < b > Email < /b>  </label > < br / >
                            <
                            input type = "email"
                            name = 'email'
                            value = { State.email }
                            onChange = { handleChange }
                            placeholder = 'Enter your email' / > < br / > {
                                error_message.email && < p > { error_message.email } < /p>}  <
                                /div> <
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
                                    /div >  <
                                    div className = 'form-inputs' >
                                    <
                                    label className = 'label-form' > < b > Confirm Password < /b>   </label > < br / >
                                    <
                                    input type = "password"
                                    name = 'confpassword'
                                    value = { State.confpassword }
                                    onChange = { handleChange }
                                    placeholder = 'Enter your confirmpassword' / > < br / > {
                                        error_message.confpassword && < p > { error_message.confpassword } < /p> }  <
                                        /div >  <
                                        div className = 'form-inputs' >
                                        <
                                        label className = 'label-form' > < b > Picture: < /b> </label > < br / >
                                            <
                                            input name = 'picture'
                                        value = { State.picture }
                                        onChange = { handleChange }
                                        placeholder = 'Paste link your picture' / > < br / > {
                                            error_message.picture && < p > { error_message.picture } < /p> }  <
                                            /div > 

                                            <
                                            button className = 'form-input-button'
                                            type = 'submit' > Sign up < /button> <br/ >
                                            <
                                            span className = 'form-input-submit' > Already have submitted ? < a href = './Form_login' > Login here < /a> </span >

                                            { /* ./Form_login.js */ } <
                                            /form>

                                            <
                                            /div>

                                        );

                                    };


                                    export default Sign_up_form;