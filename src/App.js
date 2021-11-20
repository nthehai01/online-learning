import GoogleLogin from "./components/GoogleLogin";
import { Routes, Route } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import Courses from "./pages/Courses";
import ActiveCourses from "./pages/ActiveCourses";
import BecomeATutor from "./pages/BecomeATutor";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <MainNavigation />
        <div className="App">
          <GoogleLogin />
        </div>
        <div className="ml-4">
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/active-courses" element={<ActiveCourses />} />
            <Route path="/become-a-tutor" element={<BecomeATutor />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default App;
