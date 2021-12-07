import "./index.css";
import { useState, useEffect } from "react";
import CourseCard from "../CourseCard";
import { get } from "../../utils/ApiCaller";
import { CircularProgress } from "@mui/material";
import Pagination from "../Pagination";

const CourseList = (props) => {
  const [enteredSearchText, setEnteredSearchText] = useState("");
  const [dataContent, setDataContent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    get("/api/courses/search?perPage=100")
      .then((res) => {
        setDataContent(res.data.content.items);
      })
      .then(() => setIsLoading(false));
  }, []);
  const submitHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    get("/api/courses/search?q=" + enteredSearchText)
      .then((res) => {
        setDataContent(res.data.content.items);
      })
      .then(() => setIsLoading(false));
  };
  const enteredSearchTextChangeHandler = (event) => {
    setEnteredSearchText(event.target.value);
  };
  return (
    <>
      <form className="form-inline m-2 ml-4 mt-4 mr-2" onSubmit={submitHandler}>
        <input
          className="form-control"
          type="search"
          placeholder="Search Here..."
          aria-label="Tìm kiếm"
          onChange={enteredSearchTextChangeHandler}
        />
        <button
          className="btn btn-outline-success my-2 ml-2 my-sm-0"
          type="submit"
        >
          Search
        </button>
      </form>
      <div>
        <div className="title m-2 ml-4">All Courses</div>
        {!isLoading && dataContent.length > 0 && (
          <Pagination
            data={dataContent.map((dataDetail) => (
              <CourseCard dat={dataDetail} key={dataDetail._id} />
            ))}
          ></Pagination>
        )}
        {!isLoading && dataContent.length === 0 && (
          <div className="ml-2">No course!</div>
        )}
        {isLoading && <CircularProgress className="m-2" />}
      </div>
    </>
  );
};
export default CourseList;
