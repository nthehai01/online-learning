import GoogleLogin from "./components/GoogleLogin";
import { Routes, Route } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import Courses from "./pages/Courses";
import CourseHistory from "./pages/CourseHistory";
import BecomeATutor from "./pages/BecomeATutor";
import "./App.css";

function App() {
  return (
    <>
      <div>
        <MainNavigation />
        <div className="ml-4">
          <Routes>
            <Route path="/" element={<Courses />} />
            <Route path="/courses" element={<Courses />} />
            <Route path="/course-history" element={<CourseHistory />} />
            <Route path="/become-a-tutor" element={<BecomeATutor />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
export default App;
