import React from "react";
import "./CourseCard.css";
const CourseCard = (props) => {
  var dataDetail = props.dat;
  const calStar = (dataDetail) => {
    var avgstar = 0;
    for (let j = 0; j < dataDetail.rating.length; j++) {
      avgstar += dataDetail.rating[j].star;
    }
    avgstar = avgstar / dataDetail.rating.length;
    if (dataDetail.rating.length === 0) return -1;
    return avgstar;
  };

  return (
    <>
      <div className="card m-1 cardCourse" key={dataDetail.courseName}>
        <div className="imgCardCourse">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg/1200px-NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg"
            className="card-img-top"
            alt="..."
          />
        </div>
        <div className="card-body">
          <h5 className="title card-title align-middle margin:{auto}">
            {dataDetail.courseName}
          </h5>
          <p className="card-text m-0">{dataDetail.description}</p>
          <div className="row">
            <div className="col-8">
              <p className="card-text m-0">Tutor By: {dataDetail.tutor}</p>
              {calStar(dataDetail) < 0 ? (
                `No reviews yet`
              ) : (
                <span className="stars">
                  <span
                    style={{ width: calStar(dataDetail) * 16 + "px" }}
                  ></span>
                </span>
              )}
            </div>
            <div className="col-4">
              <a
                href="https://www.google.com/"
                className="btn btn-primary mb-2 text-right h-100 d-flex align-items-center justify-content-center"
              >
                JOIN
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
