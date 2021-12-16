import GoogleLogin from "./components/GoogleLogin";

// Router của Bảooo
// import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
// import React from "react";
// import "./App.css";
// import Home from "./components/Home/home";
// import CourseDetail from "./components/CourseDetail/courseDetail";
// import AccountManagment from "./components/Account/account";
// import Header from "./components/Header";

// function App() {
//   return (
//     <Router>
//       <div>
//         {/* <nav>
//           <ul>
//             <li>
//               <Link to="/">Home</Link>
//             </li>
//             <li>
//               <Link to="/account">Account</Link>
//             </li>
//             <li>
//               <Link to="/course">Course</Link>
//             </li>
//           </ul>
//         </nav> */}

//         <Header />

//         {/* A <Switch> looks through its children <Route>s and
//       renders the first one that matches the current URL. */}
//         <Switch>
//           <Route path="/user">
//             <AccountManagment />
//           </Route>
//           <Route path="/course/:courseID">
//             <CourseDetail />
//           </Route>
//           <Route path="/">
//             <Home />
//           </Route>
//         </Switch>
//       </div>
//     </Router>
//   )}

import { Routes, Route } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import CourseListPage from "./pages/CourseListPage";
import CourseHistoryPage from "./pages/CourseHistoryPage";
import CourseCreatePage from "./pages/CourseCreatePage";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";
import { BrowserRouter } from "react-router-dom";

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
