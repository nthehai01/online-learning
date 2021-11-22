import React from "react";
import "./CourseHistoryCard.css";
const CourseHistoryCard = (props) => {
  var dataDetail = props.dat;
  // var daydiff = Math.ceil(
  //   Math.abs(new Date().getTime() - dataDetail.date) / (1000 * 60 * 60 * 24)
  // );
  console.log(new Date().getTime() - dataDetail.date);
  return (
    <>
      <div className="card m-1 cardCourseHistory">
        <div className="card-body">
          <h5 className="title card-title align-middle margin:{auto}">
            {dataDetail.course.toUpperCase()}
          </h5>
          <p className="card-text m-0">{dataDetail.date}</p>

          <p className="card-text m-0">{dataDetail.time}</p>
        </div>
      </div>
    </>
  );
};

export default CourseHistoryCard;
