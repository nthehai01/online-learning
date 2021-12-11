import GoogleLogin from './components/GoogleLogin';

// import Sign_up_form from './components/SignUp/Form_Signup';
// import Login_form from './components/Login/Form_login';
import React, { useState } from 'react'
import './Form.css';
import './App.css';
import User_edit from './components/edit_profile/edit_user_infor';

// import { post } from './utils/ApiCaller';
// import storage from './utils/LocalStorageUtils'



function App() {
    // const [Submitted, setIsSubmitted] = useState(false);

    // function submitted_data() {
    //     setIsSubmitted(true);
    // }
    return ( 
        <div className = "App">
            {/* <>
        <div className = 'form-container' >
        <div className = 'form-content-left' >

        </div> {
            !Submitted ? ( <Sign_up_form submitted_data = { submitted_data }/>) : ( < Login_form />)
        } </div> 
        </> */}
        {/* <Form /> */}
     
         <User_edit /> 

        </div>
    );
}

export default App;