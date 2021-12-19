import React from "react";
import { Link } from "react-router-dom";
import "./MainNavigation.css";
const MainNavigation = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid">
          <Link to="/" className="navbar-brand">
            HomePage
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link
                  to="/course-list"
                  className="nav-link active"
                  aria-current="page"
                >
                  All Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/course-history"
                  className="nav-link active"
                  aria-current="page"
                >
                  Course History
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/course-create"
                  className="nav-link active"
                  aria-current="page"
                >
                  Created Courses
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link
                  to="/form-signuptologin"
                  className="nav-link active"
                  aria-current="page"
                >
                  SignUp
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/form-login"
                  className="nav-link active"
                  aria-current="page"
                >
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/my-account"
                  className="nav-link active"
                  aria-current="page"
                >
                  MyAccount
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default MainNavigation;
