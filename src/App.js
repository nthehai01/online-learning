
import Sign_up_form from './components/SignUp/Form_Signup'
// import './Form.css'
import './App.css';
import Form from './Form'

import  User_edit from './components/edit_profile/edit_user_infor'

import Login_form from './components/Login/Form_login';

{/* <Form/> : đăng ký => đăng nhập
 < Sign_up_form />  : đăng ký
 < Login_form /> : đăng nhập  
 <  User_edit /> : account mangement */}

function App() {
    return ( 
        <div className = "App" >
            
             {/* <  User_edit /> */}

     
          {/* <Form/>  */}       
       
         {/* < Login_form /> */}

        < Sign_up_form /> 
       
        </div>
    );
}

export default App;