import SignUp from "../SignUp";
import FormLogin from "../FormLogin";
import React, { useState } from "react";
import "./Form.css";

function FormSignUpToLogin() {
  const [Submitted, setIsSubmitted] = useState(false);

  function submitted_data() {
    setIsSubmitted(true);
  }
  return (
    <div className="form-container">
      <div className="form-content-left"></div>{" "}
      {!Submitted ? <SignUp submitted_data={submitted_data} /> : <FormLogin />}
    </div>
  );
}

export default FormSignUpToLogin;
