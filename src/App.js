import GoogleLogin from "./components/GoogleLogin";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import "./App.css";
import Home from "./components/Home/home";
import CourseDetail from "./components/CourseDetail/courseDetail";
import AccountManagment from "./components/Account/account";
import Header from "./components/Header";

function App() {
  return (
    <Router>
      <div>
        {/* <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/course">Course</Link>
            </li>
          </ul>
        </nav> */}

        <Header />

        {/* A <Switch> looks through its children <Route>s and
      renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/user">
            <AccountManagment />
          </Route>
          <Route path="/course/:courseID">
            <CourseDetail />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
