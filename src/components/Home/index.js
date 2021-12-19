import React from "react";
import "./home.css";

function Home() {
  return (
    <div className="content-wrapper">
      <div className="container">
        <div className="row">
          <div className="col lg-3">
            <div className="content__left-side-wrapper">
              <p className="content__left-side-description">
                LEARN ENGLISH ANYWHERE, ANYTIME
              </p>
              <div className="content__left-side-btn-wrapper">
                <a
                  className="content__left-side-btn btn btn-primary"
                  href="/#/course-list"
                  role="button"
                >
                  Get Started
                </a>
              </div>
            </div>
          </div>
          <div className="col lg-6">
            <div className="content__right-side-wrapper">
              <img
                src="student.png"
                alt=""
                className="content__right-side-img"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
