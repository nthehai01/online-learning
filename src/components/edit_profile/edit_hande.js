import { useState, useEffect, useCallback } from 'react'
import { put } from '../../utils/ApiCaller';
import LocalStorageUtils from '../../utils/LocalStorageUtils';

const Handle_edit_user_infor = (validate) => {
    const initial_value = { fullname: "", phone: "", email: "", currentPassword: "", newPassword: "", picture: "" };
    const [State, SetState] = useState(initial_value);
    const [error_message, set_errors] = useState({});
    const [submitting, setsubmit] = useState(false);
    const [changepass, setpass] = useState(false);
    const [changerole, setrole] = useState(false);
    const user2_Ed = LocalStorageUtils.getUser(); /// lấy dữ liệu cũ của người dùng
    const [pass,setpass_err]=useState({})

    //
    const handleChange = e => {
        const { name, value } = e.target;
        SetState({...State, [name]: value });
    };

    const handlechangeinform = e => {
        e.preventDefault();
        set_errors(validate(State))
        setsubmit(true);

    };
    const handlechangerole = e => {
        e.preventDefault();
        setrole(true);

    };
    const handlechangepass = e => {
        e.preventDefault();
        set_errors(validate(State))
        setpass(true);

    };

       
            if (Object.keys(error_message).length === 0 && submitting) {
                const User2 = {
                    "username": user2_Ed.username,
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
                        LocalStorageUtils.setUser(res.data.content)
                        LocalStorageUtils.setToken(res.data.content.accessToken)
                        LocalStorageUtils.log(res.data.message) // check error
                        
                    }).catch(err =>   console.log(err)
                    )
                    //
                    pass.info='Change successfully'
                    setpass_err(pass)
                    setsubmit(false)
            }
  
                 if (Object.keys(error_message).length === 0 && changepass) {
                         const User={
                            "username": user2_Ed.username,
                            "currentPassword": State.currentPassword,
                            "newPassword": State.newPassword
                         }
                         console.log(User)
                            put('/api/user/change-password', User)
                                .then(res => {
                                    LocalStorageUtils.setUser(res.data.content)
                                    LocalStorageUtils.setToken(res.data.content.accessToken)
                                    console.log(res.data.message) // check error
                                    pass.error='Change password successfully'
                                    setpass_err(pass)
                                    setpass(false)  
                                }).catch(err =>{
                                    pass.error="Old password is not match"
                                    setpass_err(pass)
                                    setpass(false)  
                                })

                                setpass(false)  
                        }
            //         } , useCallback([State], [changepass],[error_message])
            // )
    // useEffect(
    //     () => {

                if ( changerole) {
                    const User1={"username": user2_Ed.username}
                    put('/api/user/become-tutor', User1)
                        .then(res => {
                            LocalStorageUtils.setUser(res.data.content)
                            LocalStorageUtils.setToken(res.data.content.accessToken)
                            console.log(res.data.message) // check error
                           
                        }).catch(err => console.log(err))
                        pass.role='Change successfully'
                        setpass_err(pass)
                        setrole(false)   // để không gửi lệnh này khi thực hiện submit khác

            }
        // }, useCallback([changerole])
    // );



    return { handleChange, handlechangeinform,handlechangerole, handlechangepass,State, error_message,pass };
};

export default Handle_edit_user_infor;


// const User2 = {
//     "username": user2_Ed.username,
//     "currentPassword": State.currentPassword,
//     "newPassword": State.newPassword,
//     "fullName": State.fullname,
//     "phone": State.phone,
//     "email": State.email,
//     "picture": State.picture
// }