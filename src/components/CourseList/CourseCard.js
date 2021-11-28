import React from "react";
import "./CourseCard.css";
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
  console.log(dataDetail);

  return (
    <>
      <div
        className="card m-1 cardCourse"
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
          <p className="card-text m-0">{dataDetail.description}</p>
          <div className="row">
            <div className="col-6">
              <p className="card-text m-0">Giảng viên: {dataDetail.tutor}</p>
              {calStar(dataDetail) < 0 ? (
                `Chưa có đánh giá`
              ) : (
                <Rating
                  className="mt-1"
                  name="read-only"
                  value={calStar(dataDetail)}
                  precision={0.5}
                  size="small"
                  readOnly
                />
              )}
            </div>
            <div className="col-6">
              <a
                href="https://www.google.com/"
                className="btn btn-primary mb-2 text-right h-100 d-flex align-items-center justify-content-center"
              >
                XEM CHI TIẾT
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
