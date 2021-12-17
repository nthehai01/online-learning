import React from "react";
import { Link } from "react-router-dom";
import "./header.css";

function Header() {
  return (
    <div className="header">
      <div className="container">
        <div className="row">
          <div className="col-lg-2">
            <div className="logo-wrapper">
              <p className="logo__description">
                <a href="/" className="logo-link">
                  StudyWithUs
                </a>
              </p>
            </div>
          </div>

          <div className="col-lg-8">
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/schedule">Schedule</Link>
                {/* <a href="" className="nav-item-link">Shedule</a> */}
              </li>
              <li className="nav-item">
                <Link to="/course">Course</Link>
                {/* <a href="" className="nav-item-link">Course</a> */}
              </li>
              <li className="nav-item">
                <Link to="/user">Account</Link>
                {/* <a href="" className="nav-item-link">Become a Tutor</a> */}
              </li>
            </ul>
          </div>

          <div className="col-lg-2">
            <div className="authenticate-wrapper">
              <a
                className="authenticate-btn btn btn-primary"
                href="#"
                role="button"
              >
                Sign In
              </a>
              <a
                className="authenticate-btn btn btn-outline-primary"
                href="#"
                role="button"
              >
                Sign Up
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Header;
