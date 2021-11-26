import React from "react";
import "./course-detail.css"

function CourseDetail() {
    return (
        <><div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-2">
                        <div class="logo-wrapper">
                            <p class="logo__description">
                                <a href="" class="logo-link">StudyWithUs</a>
                            </p>
                        </div>
                    </div>

                    <div class="col-lg-8">
                        <ul class="nav-list">
                            <li class="nav-item">
                                <a href="" class="nav-item-link">Tutor</a>
                            </li>
                            <li class="nav-item">
                                <a href="" class="nav-item-link">Shedule</a>
                            </li>
                            <li class="nav-item">
                                <a href="" class="nav-item-link">Course</a>
                            </li>
                            <li class="nav-item">
                                <a href="" class="nav-item-link">Become a Tutor</a>
                            </li>
                        </ul>
                    </div>

                    <div class="col-lg-2">
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
                        <div class="col-lg-4">
                            <div class="content__left-side-wrapper center">
                                <div class="course-wrapper">
                                    <img src="../../../public/student.png" alt="" class="course-img" />
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-8">
                            <div class="content__right-side-wrapper">
                                <h1>Overview</h1>
                                <h3>Why take this course?</h3>
                                <p>It can be intimidating to speak with a foreigner, no matter how much grammar and
                                    vocabulary you've mastered. If you have basic knowledge of English but have not spent
                                    much time speaking, this course will help you ease into your first English
                                    conversations.</p>

                                <h3>What will you be able to do?</h3>
                                <p>This course covers vocabulary at the CEFR A2 level. You will build confidence while
                                    learning to speak about a variety of common, everyday topics. In addition, you will
                                    build implicit grammar knowledge as your tutor models correct answers and corrects your
                                    mistakes.</p>

                                <h3>Teacher</h3>
                                <p>Mr.A</p>

                                <h3>Schedule</h3>
                                <p>8:00AM - 10:00AM - Wednesday and Friday</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}
export default CourseDetail;