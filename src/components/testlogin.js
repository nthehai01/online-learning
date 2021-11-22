import { useState, useEffect } from "react";
import { get } from "../../utils/ApiCaller";
const CourseList = (props) => {
  useEffect(() => {
    get("/api/courses/search?perPage=100").then((res) => {
      setDataContent(res.data.content.items);
    });
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
      <div className="title m-1">Tìm kiếm khóa học</div>
      <form className="form-inline" onSubmit={submitHandler}>
        <input
          className="form-control mr-sm-2 m-1"
          type="search"
          placeholder="Search or type URL"
          aria-label="Search"
          onChange={enteredSearchTextChangeHandler}
        />
        <button className="btn btn-outline-success my-2 my-sm-0" type="submit">
          Search
        </button>
      </form>
      <div>
        <div className="title m-1 mt-4 mb-4">Các khóa học hiện có</div>
        {!isLoading &&
          dataContent.length > 0 &&
          dataContent.map((dataDetail) => (
            <CourseCard dat={dataDetail} key={dataDetail._id} />
          ))}
        {!isLoading && dataContent.length === 0 && (
          <div className="ml-2">Không tìm thấy khóa học thỏa mãn!</div>
        )}
        {isLoading && <div className="loader"></div>}
      </div>
    </>
  );
};
export default CourseList;
