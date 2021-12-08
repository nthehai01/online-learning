import React, { useEffect, useState } from "react";
import "./courseDetail.css";
import { get, put, remove } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";

const fakeAPIGetRole = () => {
  return new Promise((res) => res("tutor"));
};

function CourseDetail() {
  const [courseName, setCourseName] = useState("");
  const [description, setDescription] = useState("");
  const [picture, setPicture] = useState("");
  const [timeStart, setTimeStart] = useState("");
  const [timeEnd, setTimeEnd] = useState("");
  const [startingDate, setStartingDate] = useState("");
  const [endingDate, setEndingDate] = useState("");
  const [fee, setFee] = useState("");
  const [tutor, setTutor] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [listDay, setListDay] = useState([]);
  const [listRating, setListRating] = useState([]);

  const [role, setRole] = useState("");

  useEffect(() => {
    // get course detail
    get("/api/courses/detail?course=toeic").then((res) => {
      const courseName = res.data.content.courseName;
      const description = res.data.content.description;
      const picture = res.data.content.picture;
      const timeStart = res.data.content.time.starting;
      const timeEnd = res.data.content.time.ending;
      const startingDate = res.data.content.startingDate;
      const endingDate = res.data.content.endingDate;
      const fee = res.data.content.fee;
      const tutor = res.data.content.tutor;
      const listDay = res.data.content.day;
      const listRating = res.data.content.rating;
      const zoomLink = res.data.content.zoomHostLink;
      setCourseName(courseName);
      setDescription(description);
      setPicture(picture);
      setTimeStart(timeStart);
      setTimeEnd(timeEnd);
      setStartingDate(startingDate);
      setEndingDate(endingDate);
      setFee(fee);
      setTutor(tutor);
      setListDay(listDay);
      setListRating(listRating);
      setZoomLink(zoomLink);
    });

    fakeAPIGetRole().then((res) => setRole(res));
  }, []);

  const [star, setStar] = useState(3);
  const renderRadioButton = () => {
    return (
      <form className="form-rating">
        <p>Please select your rating:</p>
        <div>
          <input type="radio" id="star1" name="star" value="1" />
          <label for="star1">1</label>
        </div>
        <div>
          <input type="radio" id="star2" name="star" value="2" />
          <label for="star2">2</label>
        </div>
        <div>
          <input type="radio" id="star3" name="star" value="3" />
          <label for="star3">3</label>
        </div>
        <div>
          <input type="radio" id="star4" name="star" value="4" />
          <label for="star4">4</label>
        </div>
        <div>
          <input type="radio" id="star4" name="star" value="4" />
          <label for="star4">5</label>
        </div>
        <input type="submit" value="Submit" className="btn btn-primary" />
      </form>
    );
  };

  const editCourseInfo = () => {
    LocalStorageUtils.setToken(
      "eyJhbGciOiJIUzI1NiJ9.am9obg.OirPHigUG9vv4cWPZU_iPJHwH50iwMAWY5AfI9pTNb0"
    );
    put("/api/courses/update", {
      slug: "toeic",
      description: "TOEIC course",
    }).then((res) => {
      console.log(res.data);
    });
  };

  const deleteCourse = () => {
    LocalStorageUtils.setToken(
      "eyJhbGciOiJIUzI1NiJ9.am9obg.OirPHigUG9vv4cWPZU_iPJHwH50iwMAWY5AfI9pTNb0"
    );
    remove("/api/courses/delete", { slue: "ie" }).then((res) => {
      console.log(res.data.message);
    });
  };

  const renderControlPanel = () => {
    if (role === "tutor") {
      return (
        <React.Fragment>
          <div
            href=""
            className="tutor-btn btn btn-primary"
            onClick={editCourseInfo()}
          >
            Sửa thông tin khóa học
          </div>
          <div
            href=""
            className="tutor-btn btn btn-primary"
            onClick={deleteCourse()}
          >
            Xóa khóa học
          </div>
          <a href="" className="tutor-btn btn btn-primary">
            Tạo link zoom
          </a>
          <a href="" className="tutor-btn btn btn-primary">
            Nhận tiền
          </a>
        </React.Fragment>
      );
    } else if (role === "student") {
      return (
        <React.Fragment>
          <a href="" className="tutor-btn btn btn-primary">
            Đăng kí khóa học
          </a>
          <a href="" className="tutor-btn btn btn-primary">
            Tham gia
          </a>
          <a href="" className="tutor-btn btn btn-primary">
            Đánh giá
          </a>
          {renderRadioButton()}
        </React.Fragment>
      );
    }
    return <React.Fragment></React.Fragment>;
  };

  return (
    <div className="container">
      <div className="row">
        <div className="card-wrapper col-lg-4">
          <div className="card m-4">
            <img src={picture} className="card-img-top" alt="..." />
            <div className="card-body">
              <h3 className="card-title">{courseName}</h3>
              <p className="card-text">{description}</p>
              <p className="card-text">
                <b>Tutor:</b> {tutor}
              </p>
              <p className="card-text">
                <b>Time:</b> {timeStart} - {timeEnd}
              </p>
              <p className="card-text">
                <b>Length :</b> {startingDate} - {endingDate}
              </p>
              <p className="card-text">
                <b>Fee:</b> {fee}
              </p>
              <p className="card-text">
                <b>Day:</b>
                {listDay.map((day) => {
                  <p>{day}</p>;
                })}
              </p>
              <p className="card-text">
                <b>Rating:</b>{" "}
                {listRating.map((star) => {
                  {
                    star;
                  }
                })}
              </p>
            </div>
          </div>
        </div>
        <div className="control-panel col-lg-8">{renderControlPanel()}</div>
      </div>
    </div>
  );
}
export default CourseDetail;
