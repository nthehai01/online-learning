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
                  to="/courses"
                  className="nav-link active"
                  aria-current="page"
                >
                  All Courses
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/active-courses"
                  className="nav-link active"
                  aria-current="page"
                >
                  Courses In Progress
                </Link>
              </li>
              <li className="nav-item">
                <Link
                  to="/become-a-tutor"
                  className="nav-link active"
                  aria-current="page"
                >
                  Become A Tutor
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
