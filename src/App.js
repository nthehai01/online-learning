import GoogleLogin from "./components/GoogleLogin";
import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import CourseListPage from "./pages/CourseListPage";
import CourseHistoryPage from "./pages/CourseHistoryPage";
import CourseCreatePage from "./pages/CourseCreatePage";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";
import LocalStorageUtils from "./utils/LocalStorageUtils";
import Account from "./components/Account/account";
//Phuc
import FormSignUpToLoginPage from "./pages/FormSignUpToLoginPage";
import FormLoginPage from "./pages/FormLoginPage";
import FormUserEditPage from "./pages/FormUserEditPage";
//Bao
import CourseDetailPage from "./pages/CourseDetailPage";

import HomePage from "./pages/HomePage";
function App() {
  return (
    <BrowserRouter>
      <div>
        <MainNavigation />
        <div className="ml-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/course-list" element={<CourseListPage />} />
            <Route path="/course-history" element={<CourseHistoryPage />} />
            <Route path="/course-create" element={<CourseCreatePage />} />

            {/*phuc*/}
            <Route
              path="/form-signuptologin"
              element={<FormSignUpToLoginPage />}
            />
            <Route path="/form-login" element={<FormLoginPage />} />
            <Route path="/form-edit" element={<FormUserEditPage />} />

            {/* Bảo thêm dô đoạn này  */}
            <Route path="/my-account" element={<Account />} />
            <Route path="/course/:courseID" element={<CourseDetailPage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
