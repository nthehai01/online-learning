import GoogleLogin from './components/GoogleLogin';

//import Sign_up_form from './Form_Signup'
import Form from './Form'
import './App.css';
import User_edit from './edit_profile/edit_user_infor';
// import { post } from './utils/ApiCaller';
// import storage from './utils/LocalStorageUtils'



function App() {
    return ( <
        div className = "App" >

        <
        Form / >
        <
        GoogleLogin / >
        <
        User_edit / >

        <
        /div>
    );
}

export default App;