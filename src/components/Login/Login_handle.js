import { useState, useEffect } from 'react'
import { post } from '../../utils/ApiCaller';
import LocalStorageUtils from '../../utils/LocalStorageUtils'
const Handle_login = (validate) => {
    const initial_value = { username: "", password: "" };
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
    //callback = () => {}
    useEffect(
        () => {
            if (Object.keys(error_message).length === 0 && submitting) {
                //console.log(Object.submitting)
                //callback();

                console.log(State)
                post('/api/user/login', State)
                    .then(res => {
                        LocalStorageUtils.setUser(res.data.content)
                        LocalStorageUtils.setToken(res.data.content.accessToken)
                        LocalStorageUtils.log(res.data.message) // check error
                    }).catch(err => console.log(err))
            }
        }, [error_message], [State]
    );


    return { handleChange, handlesubmit, State, error_message };
};

export default Handle_login;