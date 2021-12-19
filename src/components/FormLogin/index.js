import React, { useState } from "react";
import Validate from "./login_validate";
import Handle_login from "./Login_handle";
import GoogleSignIn from "../GoogleLogin";
import { Navigate } from "react-router-dom";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
const FormLogin = () => {
  const { handleChange, handlesubmit, State, error_message, login } =
    Handle_login(Validate);
  //thang them vao
  const [loginn, setLoginn] = useState(login);
  if (LocalStorageUtils.getUser() !== null) {
    return <Navigate to="/" />;
  }
  //done

  return (
    <div className="form-content mx-auto">
      <form onSubmit={handlesubmit} className="form-container" noValidate>
        <h1> Login </h1>
        <div className="form-inputs">
          <label className="label-form">
            <b> Username </b>
          </label>
          <br />
          <input
            type="text"
            name="username"
            value={State.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <br />
          {error_message.username && <p> {error_message.username} </p>}
        </div>
        <div className="form-inputs">
          <label className="label-form">
            {" "}
            <b> Password </b>{" "}
          </label>{" "}
          <br />
          <input
            type="password"
            name="password"
            value={State.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />{" "}
          <br />
          {error_message.password && <p> {error_message.password} </p>}
        </div>
        <div className="form-inputs">
          <button className="form-input-button" type="submit">
            {" "}
            Login{" "}
          </button>{" "}
          <br />
          {login.mes && <p> {login.mes} </p>}
        </div>
        {/* <span className = 'form-input-submit' > Already have submitted ? Login <a href = '#'> here </a> </span> */}
        <GoogleSignIn />
      </form>
    </div>
  );
};

export default FormLogin;
