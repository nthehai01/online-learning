import React, { useEffect, useState } from "react";
import "./courseDetail.css";
import { get, post, put, remove } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import { Navigate, useParams, useRouteMatch } from "react-router-dom";

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
  const [zoomHostLink, setZoomHostLink] = useState("");
  const [listDay, setListDay] = useState([]);
  const [slug, setSlug] = useState("");

  // Set role cho học sinh và giáo viên
  const [role, setRole] = useState("");
  const [star, setStar] = useState("");

  const { courseID } = useParams();
  console.log({ courseID });

  useEffect(() => {
    // get course detail

    get("/api/courses/detail?course=" + courseID).then((res) => {
      const courseName = res.data.content.courseName;
      const description = res.data.content.description;
      var picture = res.data.content.picture;
      if (!picture)
        picture =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg/1200px-NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg";
      const timeStart = res.data.content.time.starting;
      const timeEnd = res.data.content.time.ending;
      const startingDate = res.data.content.startingDate;
      const endingDate = res.data.content.endingDate;
      const fee = res.data.content.fee;
      const tutor = res.data.content.tutor;
      const listDay = res.data.content.day;
      const listRating = res.data.content.rating;
      const zoomLink = res.data.content.zoomLink;
      const zoomHostLink = res.data.content.zoomHostLink;
      const slug = res.data.content.slug;
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
      setZoomLink(zoomLink);
      setSlug(slug);
    });
    // TEST LOGIN
    post("/api/user/login", {
      username: "john",
      password: "123456",
    }).then((res) => {
      LocalStorageUtils.setUser(res.data.content);
      LocalStorageUtils.setToken(res.data.content.accessToken);
    });

    console.log(listDay);

    // Get Role tương ứng
    getRole();
  }, []);
  if (LocalStorageUtils.getUser() === null) {
    return <Navigate to="/form-login" />;
  }
  const getRole = async () => {
    const user = LocalStorageUtils.getUser();
    if (user !== null) setRole(user.role);
  };

  // OK
  const editCourseInfo = () => {
    LocalStorageUtils.getToken();
    const courseNameEdit = document.querySelector("#courseName").value;
    const descriptionEdit = document.querySelector("#description").value;
    const feeEdit = document.querySelector("#fee").value;
    const timeStartEdit = document.querySelector("#timeStart").value;
    const timeEndEdit = document.querySelector("#timeEnd").value;
    const startingDateEdit = document.querySelector("#startingDate").value;
    const endingDateEdit = document.querySelector("#endingDate").value;
    put("/api/courses/update", {
      slug: slug,
      courseName: courseNameEdit,
      description: descriptionEdit,
      fee: feeEdit,
      time: {
        starting: timeStartEdit,
        ending: timeEndEdit,
      },
      startingDate: startingDateEdit,
      endingDate: endingDateEdit,
    })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err.response));
  };

  // OK
  const deleteCourse = () => {
    LocalStorageUtils.getToken();
    remove("/api/courses/delete", { slug: slug })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err.response));
  };

  // OK
  const createZoomHostLink = () => {
    LocalStorageUtils.getToken();
    post("/api/courses/new-meeting", { slug: slug })
      .then((res) => {
        const zoomHostLink = res.data.content.zoomHostLink;
        const zoomLink = res.data.content.zoomLink;
        if (document.querySelector(".zoomLinkContent"))
          document.querySelector(".zoomLinkContent").innerHTML = zoomHostLink;
        if (document.querySelector(".zoomLinkContentStudent"))
          document.querySelector(".zoomLinkContentStudent").innerHTML =
            zoomLink;
      })
      .catch((err) => console.log(err));
  };

  // OK ----
  const getMoney = () => {
    LocalStorageUtils.getToken();
    put("/api/enrolling/get-credit", { course: courseID })
      .then((res) => alert(res.data.message))
      .catch((err) => console.log(err.response));
  };

  // Student
  const enrollCourse = () => {
    const user = LocalStorageUtils.getUser();
    post("/api/enrolling/enroll", { course: courseID, username: user.username })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response.data.message));
  };

  const joiningCourse = () => {
    const user = LocalStorageUtils.getUser();
    post("/api/joining/join", { course: courseID, username: user.username })
      .then((res) => {
        alert(res.data.message);
        document.querySelector(".zoomLinkContentStudent").innerHTML = zoomLink;
      })
      .catch((err) => {
        console.log(err.response);
        document.querySelector(".zoomLinkContentStudent").innerHTML =
          err.response.data.message;
      });
  };

  // Chỗ này làm có hơi củ chuối
  const rateCourse = () => {
    LocalStorageUtils.getToken();
    const user = LocalStorageUtils.getUser();
    const starEdit = document.querySelector("#star").value;
    put("/api/courses/rate", {
      course: courseID,
      rating: { username: user.username, star: starEdit },
    })
      .then((res) => {
        alert(res.data.message);
      })
      .catch((err) => console.log(err.response));
  };

  const renderRadioButton = () => {
    return (
      <form className="form-rating">
        <p>Please input your rating: (1-5)</p>
        <div className="form-group">
          <input
            type="number"
            className="form-control mb-2 mt-2"
            id="star"
            min="1"
            max="5"
          />
        </div>
        <input
          type="button"
          value="Submit"
          className="btn btn-primary"
          onClick={rateCourse}
        />
      </form>
    );
  };

  const renderControlPanel = () => {
    if (role === "tutor") {
      return (
        <React.Fragment>
          <h4 className="mt-2">Course Info Edit</h4>
          <p className="no-margin-bottom mt-3">Course Name</p>
          <input
            type="text"
            className="form-control mt-2"
            id="courseName"
            defaultValue={courseName}
          />
          <p className="no-margin-bottom mt-3">Description</p>
          <input
            type="text"
            className="form-control mt-2"
            id="description"
            defaultValue={description}
          />
          <p className="no-margin-bottom mt-3">Fee</p>
          <input
            type="number"
            className="form-control mt-2"
            id="fee"
            defaultValue={fee}
          />
          <p className="no-margin-bottom mt-3">Time Start</p>
          <input
            type="text"
            className="form-control mt-2"
            id="timeStart"
            defaultValue={timeStart}
          />
          <p className="no-margin-bottom mt-3">Time End</p>
          <input
            type="text"
            className="form-control mt-2"
            id="timeEnd"
            defaultValue={timeEnd}
          />
          <p className="no-margin-bottom mt-3">Starting Date</p>
          <input
            type="text"
            className="form-control mt-2"
            id="startingDate"
            defaultValue={startingDate}
          />
          <p className="no-margin-bottom mt-3">Ending Date</p>
          <input
            type="text"
            className="form-control mt-2"
            id="endingDate"
            defaultValue={endingDate}
          />
          <div
            href=""
            className="tutor-btn btn btn-primary mb-4"
            onClick={editCourseInfo}
          >
            Edit
          </div>

          <h4 className="mt-2"> Delete this course</h4>
          <div
            href=""
            className="tutor-btn btn btn-primary mb-4"
            onClick={deleteCourse}
          >
            Delete
          </div>

          <h4 className="mt-2"> Create Zoom Host Link</h4>
          <div
            href=""
            className="tutor-btn btn btn-primary"
            onClick={createZoomHostLink}
          >
            Create
          </div>
          <p className="zoomLinkContent">Zoom Link will be pasted here!!</p>

          <h4 className="mt-2"> Get Money</h4>
          <div
            href=""
            className="tutor-btn btn btn-primary mb-4"
            onClick={getMoney}
          >
            Get Money
          </div>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment>
        <div
          href=""
          className="tutor-btn btn btn-primary"
          onClick={enrollCourse}
        >
          Đăng kí khóa học
        </div>
        <div
          href=""
          className="tutor-btn btn btn-primary"
          onClick={joiningCourse}
        >
          Tham gia
        </div>
        <div
          href=""
          className="tutor-btn btn btn-primary"
          onClick={createZoomHostLink}
        >
          Get Zoom Link
        </div>
        <p className="zoomLinkContentStudent">
          Zoom Link will be pasted here!!
        </p>
        <h4 href="">Rating Course</h4>
        {renderRadioButton()}
      </React.Fragment>
    );
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
                  return <div>{day}</div>;
                })}
              </p>
              {/* <p className="card-text">
                <b>Rating:</b>
                {listRating.map((rating) => {
                  return <p>{star}</p>;
                })}
              </p> */}
            </div>
          </div>
        </div>
        <div className="control-panel col-lg-4">{renderControlPanel()}</div>
      </div>
    </div>
  );
}
export default CourseDetail;
