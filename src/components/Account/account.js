import React, { useEffect, useState } from "react";
import "./account.css";

import { get, post, put } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Navigate } from "react-router-dom";
import CourseCard from "../CourseCard";

function AccountManagemnt() {
  const [username, setUsername] = useState("");
  const [listCourses, setListCourses] = useState([]);
  const [balance, setBalance] = useState("");

  useEffect(() => {
    // Get User + Course List

    const user = LocalStorageUtils.getUser();
    if (user === null) return;
    const username = user.username;
    const balance = user.balance;
    setUsername(username);
    setBalance(balance);
    get("/api/enrolling/my-enrollment?username=" + { username }, {
      username: user.username,
    })
      .then((res) => {
        setListCourses(res.data.content.filter((x) => x != null));
      })
      .catch(console.error());
  }, []);

  if (LocalStorageUtils.getUser() === null) {
    return <Navigate to="/form-login" />;
  }
  const handlePayIn = (req) => {
    LocalStorageUtils.getToken();
    const user = LocalStorageUtils.getUser();
    const amount = document.querySelector("#amount").value;
    put("/api/user/top-up", { username: user?.username, amount: amount }).then(
      (res) => {
        alert(res.data.message);
        user.balance += parseInt(amount);
        LocalStorageUtils.setUser(user);
        console.log("amount", amount);
      }
    );
  };
  const logOut = () => {
    LocalStorageUtils.clear();
    window.location.reload();
  };
  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="row border-bottom">
          <div className="col-lg-12">
            <div className="account-info-wrapper mb-4">
              <h3 className="account-heading">Account</h3>
              <button
                className="sign-out-link btn-sm btn-primary"
                onClick={logOut}
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>

        <div className="row border-bottom">
          <div className="col-lg-12">
            <div className="account-password-container mb-4 mt-4">
              <h3 className="account-password-heading">Hi, {username}</h3>
              <a
                className="account-management-link btn btn-primary btn-sm"
                href="/#/form-edit"
              >
                AccountManagemnt
              </a>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="booking-container">
              <h3 className="booking-heading">My Enrolled Course </h3>
            </div>
          </div>
        </div>

        <div className="card-wrapper ">
          {listCourses.map((course, index) => {
            return <CourseCard dat={course} key={index} />;
          })}
        </div>
        <div className="clrfloat border-bottom"></div>

        <div className="row mt-4 mb-4 border-bottom">
          <h3>Your balance is: {balance} (VND)</h3>
        </div>

        <div className="row mt-4 button-handle">
          <form className="mt-4 topup-wrapper">
            <div className="form-group">
              <label for="amount">Top Up Here</label>
              <input type="number" className="form-control mt-2" id="amount" />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-4 ml-2"
              onClick={handlePayIn}
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default AccountManagemnt;
