import { useState, useEffect, useCallback } from 'react'
import { put } from '../utils/ApiCaller';
import storage from '../utils/LocalStorageUtils'

const Handle_edit_user_infor = (validate) => {
    const initial_value = { fullname: "", phone: "", email: "", currentPassword: "", newPassword: "", picture: "", role: "" };
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

                console.log(State)
                const user2_Ed = storage.getUser(); /// lấy dữ liệu cũ của người dùng
                const User2 = {
                    "username": user2_Ed.username,
                    "currentPassword": State.currentPassword,
                    "newPassword": State.newPassword,
                    "fullName": State.fullname,
                    "phone": State.phone,
                    "email": State.email,
                    "picture": State.picture
                }
                if (User2.fullName === '') { User2.fullName = user2_Ed.fullName }
                if (User2.email === '') { User2.email = user2_Ed.email }
                if (User2.phone === '') { User2.phone = user2_Ed.phone }
                if (User2.picture === '') { User2.picture = user2_Ed.picture }
                put('/api/user/change-info', User2)
                    .then(res => {
                        storage.setUser(res.data.content)
                        storage.setToken(res.data.content.accessToken)
                        console.log(res.data.message) // check error
                    }).catch(err => console.log(err))
                    //


                // callback();
                // CHANGE PASS
                if (User2.newPassword.length !== 0) {
                    put('/api/user/change-password', User2)
                        .then(res => {
                            storage.setUser(res.data.content)
                            storage.setToken(res.data.content.accessToken)
                            console.log(res.data.message) // check error
                        }).catch(err => console.log(err))
                }
                //
                // if (user2_Ed === null) { console.warn('Change inform failed, check again!') }
                // callback();
                //CHANGE ROLE
                if (State.role !== 'yes') {

                    put('/api/user/become-tutor', User2)
                        .then(res => {
                            storage.setUser(res.data.content)
                            storage.setToken(res.data.content.accessToken)
                            console.log(res.data.message) // check error
                        }).catch(err => console.log(err))
                }

            }
        }, useCallback([State], [submitting], [error_message])
    );



    return { handleChange, handlesubmit, State, error_message };
};

export default Handle_edit_user_infor;