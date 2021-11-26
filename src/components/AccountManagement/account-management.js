import React from "react";
import "./account-management.css"

function AccountManagemnt() {
    return (
        <><div class="header">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3">
                        <div class="logo-wrapper">
                            <a href="" class="logo-link">StudyWithUs</a>
                        </div>
                    </div>

                    <div class="col-lg-6">
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
                        </ul>
                    </div>

                    <div class="col-lg-3">
                        <div class="account-wrapper">
                            <a class="account-btn" href="#" role="button">
                                <i class="account-icon fas fa-user"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div><div class="content-wrapper">
                <div class="container">

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="account-info-wrapper">
                                <p class="account-info-heading">USERNAME</p>
                                <p class="account-info">admin</p>
                                <a class="changeUsername-btn btn btn-primary btn-sm" href="#">Change</a>
                            </div>
                            <div class="account-info-wrapper">
                                <p class="account-info-heading">NAME</p>
                                <p class="account-info">ADMINISTRATOR</p>
                            </div>
                            <div class="account-info-wrapper">
                                <p class="account-info-heading">EMAIL</p>
                                <p class="account-info">admin@gmail.com</p>
                            </div>
                        </div>
                    </div>

                    <div class="row">
                        <div class="col-lg-12">
                            <div class="account-password-container">
                                <p class="account-password-heading">PASSWORD</p>
                                <a class="changePassword-btn btn btn-primary btn-sm" href="#">Change</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div></>
    )
}

export default AccountManagemnt;