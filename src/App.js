import GoogleLogin from './components/GoogleLogin';
//import Sign_up_form from './Form_Signup'
import Form from './Form'
import './App.css';
// import { post } from './utils/ApiCaller';
// import storage from './utils/LocalStorageUtils'

// const user1 = {
//     "username": "hero12345",
//     "password": "123456789"
// }
// post('/api/user/signup', user1)
//     .then(res => {
//         storage.setUser(res.data.content)
//         storage.setToken(res.data.content.accesToken)
//         console.log(res.data.content.accesToken)
//     }).catch(err => console.log(err))

function App() {
    return ( <
        div className = "App" >
        <
        GoogleLogin / >
        <
        Form / >

        <
        /div>
    );
}

export default App;