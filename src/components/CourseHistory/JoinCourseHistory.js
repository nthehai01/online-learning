import { get } from "../../utils/ApiCaller";
import { useState, useEffect } from "react";
import CourseHistoryCard from "./CourseHistoryCard";
import CourseHistoryFilter from "./CourseHistoryFilter";
const CourseHistory = (props) => {
  const [isLoading, setIsLoading] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  const [filteredText, setFilteredText] = useState("all");
  useEffect(() => {
    setIsLoading(true);
    get("/api/joining/my-joining", {
      username: "david",
    })
      .then((res) => setDataContent(res.data.content))
      .then(() => setIsLoading(false));
  }, []);

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
        <div className="title m-1 mt-4 mb-4">Lịch sử tham gia khóa học</div>
        <div>
          {!isLoading && (
            <CourseHistoryFilter
              options={dataContent.map((dataDetail) => dataDetail.course)}
              selected={filteredText}
              onChangeFilter={filterChangeHandler}
            />
          )}
        </div>
        {!isLoading &&
          filteredDataContent.length > 0 &&
          filteredDataContent.map((dataDetail) => (
            <CourseHistoryCard dat={dataDetail} key={dataDetail._id} />
          ))}
        {!isLoading && filteredDataContent.length === 0 && (
          <div className="ml-2">
            Hiện tại bạn chưa tham gia khóa học nào cả.
          </div>
        )}
        {isLoading && <div className="loader"></div>}
      </div>
    </>
  );
};
export default CourseHistory;
