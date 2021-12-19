import { get } from "../../utils/ApiCaller";
import { useState, useEffect } from "react";
import CourseHistoryFilter from "./CourseHistoryFilter";
import { CircularProgress } from "@mui/material";
import CourseTable from "./CourseTable";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Navigate } from "react-router-dom";
const CourseHistory = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  const [filteredText, setFilteredText] = useState("all");
  useEffect(() => {
    setIsLoading(true);
    if (LocalStorageUtils.getUser() === null) return;
    get("/api/joining/my-joining", {
      username: LocalStorageUtils.getUser().username,
    })
      .then((res) => setDataContent(res.data.content))
      .then(() => setIsLoading(false));
  }, []);
  if (LocalStorageUtils.getUser() === null) {
    return <Navigate to="/form-login" />;
  }
  const filterChangeHandler = (selectedYear) => {
    setFilteredText(selectedYear);
  };
  var filteredDataContent = dataContent;
  if (!isLoading && filteredText !== "all")
    filteredDataContent = filteredDataContent.filter(
      (dat) => dat.course === filteredText
    );

  return (
    <>
      <div>
        <div className="title my-3 ml-3" /*style={{ "text-align": "center" }}*/>
          Course Joining History
        </div>

        <div>
          {!isLoading && (
            <CourseHistoryFilter
              options={dataContent.map((dataDetail) => dataDetail.course)}
              selected={filteredText}
              onChangeFilter={filterChangeHandler}
            />
          )}
        </div>
        {!isLoading && filteredDataContent.length > 0 && (
          <CourseTable dat={filteredDataContent} />
        )}
        {!isLoading && filteredDataContent.length === 0 && (
          <div className="ml-2">No course</div>
        )}
        {isLoading && <CircularProgress />}
      </div>
    </>
  );
};
export default CourseHistory;
