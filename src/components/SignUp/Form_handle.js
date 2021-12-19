import { useState, useEffect, useCallback } from "react";
import { post } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
const Custom_form = (callback, validate) => {
  const initial_value = {
    Fullname: "",
    phone: "",
    Username: "",
    email: "",
    password: "",
    confpassword: "",
    picture: "",
  };
  const [State, SetState] = useState(initial_value);
  const [error_message, set_errors] = useState({});
  const [submitting, setsubmit] = useState(false);

  const [login, setlogin] = useState({});

  //
  function handleChange(e) {
    const { name, value } = e.target;
    SetState({ ...State, [name]: value });
  }

  const handlesubmit = (e) => {
    e.preventDefault();
    set_errors(validate(State));
    setsubmit(true);
  };
  // mặc định callback là function, ngăn lỗi

  useEffect(() => {
    if (Object.keys(error_message).length === 0 && submitting) {
      //console.log(Object.submitting)

      const User2 = {
        username: State.Username,
        password: State.password,
        fullName: State.Fullname,
        phone: State.phone,
        email: State.email,
        picture: State.picture,
      };
      // console.log(User2)

      post("/api/user/signup", User2)
        .then((res) => {
          console.log("Signup successful", res);
          const user2_Ed = LocalStorageUtils.setUser(res.data.content);
          if (user2_Ed === null) {
            console.warn("Registration failed, check again!");
          }

          console.log(res);
          LocalStorageUtils.setToken(res.data.content.accessToken);

          if (res.data.message === "Signup successfully") {
            callback();
          }
        })
        .catch((e) => {
          login.mes = "Signup failed. User already exists";
          setlogin(login);
          console.log(login.mes);
        }); // if error, prevent login

      // callback();
    }
  }, useCallback([State], [submitting], [error_message], [login]));

  return { handleChange, handlesubmit, State, error_message, login };
};

export default Custom_form;
