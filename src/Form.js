import GoogleLogin from './components/GoogleLogin';
import './Form.css';
import Sign_up_form from './components/SignUp/Form_Signup';
import Login_form from './components/Login/Form_login';
import React, { useState } from 'react'


// import { post } from './utils/ApiCaller';
// import storage from './utils/LocalStorageUtils'



function Form() {
    const [Submitted, setIsSubmitted] = useState(false);

    function submitted_data() {
        setIsSubmitted(true);
    }
    return ( 
        <div className = "App">
            <>
        <div className = 'form-container' >
        <div className = 'form-content-left' >

        </div> {
            !Submitted ? ( <Sign_up_form submitted_data = { submitted_data }/>) : ( < Login_form />)
        } </div> 
        </>
        {/* <Form /> */}
        <GoogleLogin />


        </div>
    );
}



export default Form;