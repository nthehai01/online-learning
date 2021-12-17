import CourseHistory from "../components/CourseHistory";
import CourseSchedule from "../components/CourseSchedule";
const CourseHistoryPage = () => {
  return (
    <>
      <div className="row d-flex">
        <div className="col">
          <CourseHistory />
        </div>
        <div className="col">
          <div className="ml-auto">
            <CourseSchedule />
          </div>
        </div>
      </div>
    </>
  );
};
export default CourseHistoryPage;
