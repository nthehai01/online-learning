import React from "react";
import "./index.css";
import Rating from "@mui/material/Rating";
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
    <div>
      <div
        className="card m-4 cardCourse myborder"
        key={dataDetail.courseName.toUpperCase()}
      >
        <div className="imgCardCourse">
          {dataDetail.picture === "#" ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg/1200px-NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg"
              className="card-img-top"
              alt="..."
            />
          ) : (
            <img src={dataDetail.picture} className="card-img-top" alt="..." />
          )}
        </div>
        <div className="card-body">
          <h5 className="title card-title align-middle margin:{auto}">
            {dataDetail.courseName}
          </h5>
          <p className="description card-text m-0">
            {dataDetail.description === "" ? (
              <i>No details</i>
            ) : (
              dataDetail.description
            )}
          </p>
          <div className="row">
            <div className="col-sm-12 col-lg-8">
              <p className="card-text m-0">Tutor: {dataDetail.tutor}</p>
              {calStar(dataDetail) < 0 ? (
                `No reviews yet`
              ) : (
                <Rating
                  name="read-only"
                  value={calStar(dataDetail)}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              )}
            </div>
            <div className="col-4">
              <a
                href={"/#/course/" + dataDetail.slug}
                className="btn btn-primary mt-2 mb-1 text-right d-flex align-items-center justify-content-center"
              >
                DETAIL
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
