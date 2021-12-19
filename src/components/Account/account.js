import React, { useEffect, useState } from "react";
import "./account.css";

import { get, post, put } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Navigate } from "react-router-dom";

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
    const username = user?.username;
    setUsername(username);
    get("/api/enrolling/my-enrollment?username=" + { username }, {
      username: user?.username,
    }).then((res) => {
      setListCourses(res.data.content);
    });
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
      (res) => alert(res.data.message)
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
                href="/form-edit"
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
          {listCourses.map((course, index) => {
            return (
              <div className="card mt-4" key={index}>
                <img
                  className="card-img-top"
                  src={course.picture}
                  alt="Card image"
                />
                <div className="card-body">
                  <h3 className="card-title">{course.courseName}</h3>
                  <h4 className="card-text">{course.description}</h4>
                  <p className="card-text">
                    <b>Tutor:</b> {course.tutor}
                  </p>
                  <p className="card-text">
                    <b>Time start:</b> {course.starting}
                  </p>
                  <p className="card-text">
                    <b>Time end:</b> {course.ending}
                  </p>
                  <p className="card-text">
                    <b>Day:</b> {course.day}
                  </p>
                  {/* <a href="/course" className="btn btn-primary">
                    See Detail
                  </a> */}
                </div>
              </div>
            );
          })}
        </div>

        <div className="row mt-4 button-handle">
          <form className="mt-4">
            <div className="form-group">
              <label for="amount">Input your money to pay</label>
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
