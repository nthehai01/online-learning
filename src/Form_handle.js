import { useState, useEffect, useCallback } from 'react'
import { post } from './utils/ApiCaller';
import storage from './utils/LocalStorageUtils'
const Custom_form = (callback, validate) => {
    const initial_value = { Fullname: "", phone: "", Username: "", email: "", password: "", confpassword: "", picture: "" };
    const [State, SetState] = useState(initial_value);
    const [error_message, set_errors] = useState({});
    const [submitting, setsubmit] = useState(false);
    //


    //
    const handleChange = e => {
        const { name, value } = e.target;
        SetState({...State, [name]: value });
    };

    const handlesubmit = e => {
        e.preventDefault();
        set_errors(validate(State))
        setsubmit(true);

    };
    // mặc định callback là function, ngăn lỗi

    useEffect(
        () => {
            if (Object.keys(error_message).length === 0 && submitting) {
                //console.log(Object.submitting)

                const User2 = {
                    "username": State.Username,
                    "password": State.password,
                    "fullName": State.Fullname,
                    "phone": State.phone,
                    "email": State.email,
                    "picture": State.picture
                }
                console.log(User2)
                post('/api/user/signup', User2)
                    .then(res => {
                        storage.setUser(res.data.content)
                        storage.setToken(res.data.content.accessToken)
                        console.log(res.data.message) // check error
                    }).catch(err => console.log(err))
                    //
                const user2_Ed = storage.getUser();
                if (user2_Ed === null) { console.warn('Registration failed, check again!') }
                callback();
            }
        }, useCallback([State], [submitting], [error_message])
    );



    return { handleChange, handlesubmit, State, error_message };
};

export default Custom_form;