import GoogleLogin from "./components/GoogleLogin";
import { Routes, Route } from "react-router-dom";
import MainNavigation from "./components/layout/MainNavigation";
import CourseListPage from "./pages/CourseListPage";
import CourseHistoryPage from "./pages/CourseHistoryPage";
import CourseCreatePage from "./pages/CourseCreatePage";
import "@progress/kendo-theme-default/dist/all.css";
import "./App.css";

//

function App() {
  return (
    <>
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
    </>
  );
}
export default App;
