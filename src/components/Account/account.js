import React, { useEffect, useState } from "react";
import "./account.css";

import { get, post, put } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Navigate } from "react-router-dom";
import CourseCard from "../CourseCard";

function AccountManagemnt() {
  const [username, setUsername] = useState("");
  const [listCourses, setListCourses] = useState([]);

  useEffect(() => {
    // get("/api/enrolling/my-enrollment?username=david").then((res) => {
    //   setListCourses(res.data.content);
    // });

    // Test đăng nhập thử

    post("/api/user/login", { username: "john", password: "123456" }).then(
      (res) => {
        LocalStorageUtils.setUser(res.data.content);
        LocalStorageUtils.setToken(res.data.content.accessToken);
      }
    );

    // Get User + Course List -- OK

    const user = LocalStorageUtils.getUser();
    if (user === null) return;
    const username = user.username;
    setUsername(username);
    get("/api/enrolling/my-enrollment?username=" + { username }, {
      username: user.username,
    })
      .then((res) => {
        if (res.data.content[0] !== null) setListCourses(res.data.content);
      })
      .catch(console.error());
  }, []);

  // OK
  // const handleChangeRole = async () => {
  //   const accessToken = LocalStorageUtils.getToken();
  //   const user = LocalStorageUtils.getUser();

  //   put("/api/user/become-tutor", { username: user.username }, {}).then(
  //     (res) => {
  //       alert(res.data.message);
  //     }
  //   );
  // };
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
        <div className="row">
          <div className="col-lg-12">
            <div className="account-info-wrapper">
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

        <div className="row">
          <div className="col-lg-12">
            <div className="account-password-container">
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
              <h5 className="booking-heading">My Enrolled Course </h5>
            </div>
          </div>
        </div>

        <div className="card-wrapper">
          {listCourses.map((course) => {
            return <CourseCard dat={course} key={course._id} />;
          })}
        </div>
        <div className="clrfloat"></div>

        <div className="row mt-4 button-handle">
          <form className="mt-4">
            <div className="form-group">
              <label for="amount">Top Up Here</label>
              <input type="number" className="form-control mt-2" id="amount" />
            </div>
            <button
              type="button"
              className="btn btn-primary mt-2"
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
