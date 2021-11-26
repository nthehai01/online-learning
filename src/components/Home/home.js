import React from "react";
import "./home.css"

function Home() {
    return (
        <><div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-6">
                        <div class="logo-wrapper">
                            <p class="logo__description">StudyWithUs</p>
                        </div>
                    </div>
                    <div class="col-lg-6">
                        <div class="authenticate-wrapper">
                            <a class="authenticate-btn btn btn-primary" href="#" role="button">Sign In</a>
                            <a class="authenticate-btn btn btn-outline-primary" href="#" role="button">Sign Up</a>
                        </div>
                    </div>
                </div>
            </div>
        </div><div class="content-wrapper">
                <div class="container">
                    <div class="row">
                        <div class="col lg-3">
                            <div class="content__left-side-wrapper">
                                <p class="content__left-side-description">LEARN ENGLISH ANYWHERE, ANYTIME</p>
                                <div class="content__left-side-btn-wrapper">
                                    <a class="content__left-side-btn btn btn-primary" href="#" role="button">Get Started</a>
                                </div>
                            </div>
                        </div>
                        <div class="col lg-6">
                            <div class="content__right-side-wrapper">
                                <img src="../../../public/student.png" alt="" class="content__right-side-img"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
export default Home;