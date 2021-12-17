import GoogleLogin from "./components/GoogleLogin";
import { Routes, Route } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import CourseListPage from "./pages/CourseListPage";
import CourseHistoryPage from "./pages/CourseHistoryPage";
import CourseCreatePage from "./pages/CourseCreatePage";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

import Form from "./components/Signup_to_login/Form";   //Form - Signup page, Signup success -> login page
import Sign_up_form from "./components/SignUp/Form_Signup";  // Signup page
import Login_form from "./components/Login/Form_login";// Login page
import User_edit from "./components/edit_profile/edit_user_infor";  // account management page


function App() {
  return (

    <BrowserRouter>
      <div>
        <MainNavigation />
        <div className="ml-4">
          <Routes>
            <Route path="/" element={<CourseListPage />} />
            <Route path="/course-list" element={<CourseListPage />} />
            <Route path="/course-history" element={<CourseHistoryPage />} />
            <Route path="/course-create" element={<CourseCreatePage />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;