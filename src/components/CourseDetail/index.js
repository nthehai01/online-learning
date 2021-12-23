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
  const getRole = async () => {
    const user = LocalStorageUtils.getUser();
    if (user !== null) setRole(user.role);
  };
  useEffect(() => {
    // Get Course Detail
    get("/api/courses/detail?course=" + courseID).then((res) => {
      const courseName = res.data.content.courseName;
      const description = res.data.content.description;
      let picture = res.data.content.picture;
      if (picture === "#")
        picture =
          "https://upload.wikimedia.org/wikipedia/commons/thumb/6/69/NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg/1200px-NASA-HS201427a-HubbleUltraDeepField2014-20140603.jpg";
      setPicture(picture);
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
    // Get Role tương ứng
    getRole();
  }, []);

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
    const user = LocalStorageUtils.getUser();
    if (user == null) {
      alert("Bạn chưa đăng ký/đăng nhập");
      <Navigate to="/form-login"></Navigate>;
    } else {
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
    }
  };

  // OK ----
  const getMoney = () => {
    LocalStorageUtils.getToken();
    put("/api/enrolling/get-credit", { course: courseID })
      .then((res) => alert(res.data.message))
      .catch((err) => alert(err.response.data.message));
  };

  // Student
  const enrollCourse = () => {
    const user = LocalStorageUtils.getUser();
    const balance = user.balance;

    if (user == null) {
      alert("Chưa đăng nhập, xin mời bạn đăng nhập");
      <Navigate to="/form-login" />;
    } else {
      post("/api/enrolling/enroll", {
        course: courseID,
        username: user.username,
      })
        .then((res) => {
          alert(res.data.message);
          console.log(res.data.content.fee);
          user.balance -= parseInt(res.data.content.fee);
          LocalStorageUtils.setUser(user);
        })
        .catch((err) => {
          alert(err.response.data.message);
        });
    }
  };

  const joiningCourse = () => {
    const user = LocalStorageUtils.getUser();
    if (user == null) {
      <Navigate to="/form-login" />;
      alert("Chưa đăng nhập, xin mời bạn đăng nhập");
    } else {
      post("/api/joining/join", { course: courseID, username: user.username })
        .then((res) => {
          //alert(res.data.message);
          alert(zoomLink);
        })
        .catch((err) => {
          alert(err.response.data.message);
          // document.querySelector(".zoomLinkContentStudent").innerHTML =
          //   err.response.data.message;
        });
    }
  };

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

  const displayRatingCourse = () => {
    const formRatingElement = document.querySelector(".notify-message");
    const user = LocalStorageUtils.getUser();
    const username = user.username;
    get("/api/enrolling/my-enrollment?username=" + username)
      .then((res) => {
        var i = 0;
        while (i < res.data.content.filter((x) => x != null).length) {
          if (
            courseName ===
            res.data.content.filter((x) => x != null)[i].courseName
          ) {
            formRatingElement.style.display = "block";
            break;
          }
          i++;
        }
        if (i == res.data.content.filter((x) => x != null).length)
          alert("User cannot rate this course");
      })
      .catch((err) => console.log(err.response));
  };

  // const renderControlPanel = () => {
  //   if (role === "tutor") {
  //     return (
  //       <React.Fragment>
  //         <h4 className="mt-2">Course Info Edit</h4>
  //         <p className="no-margin-bottom mt-3">Course Name</p>
  //         <input
  //           type="text"
  //           className="form-control mt-2"
  //           id="courseName"
  //           defaultValue={courseName}
  //         />
  //         <p className="no-margin-bottom mt-3">Description</p>
  //         <input
  //           type="text"
  //           className="form-control mt-2"
  //           id="description"
  //           defaultValue={description}
  //         />
  //         <p className="no-margin-bottom mt-3">Fee</p>
  //         <input
  //           type="number"
  //           className="form-control mt-2"
  //           id="fee"
  //           defaultValue={fee}
  //         />
  //         <p className="no-margin-bottom mt-3">Time Start</p>
  //         <input
  //           type="text"
  //           className="form-control mt-2"
  //           id="timeStart"
  //           defaultValue={timeStart}
  //         />
  //         <p className="no-margin-bottom mt-3">Time End</p>
  //         <input
  //           type="text"
  //           className="form-control mt-2"
  //           id="timeEnd"
  //           defaultValue={timeEnd}
  //         />
  //         <p className="no-margin-bottom mt-3">Starting Date</p>
  //         <input
  //           type="text"
  //           className="form-control mt-2"
  //           id="startingDate"
  //           defaultValue={startingDate}
  //         />
  //         <p className="no-margin-bottom mt-3">Ending Date</p>
  //         <input
  //           type="text"
  //           className="form-control mt-2"
  //           id="endingDate"
  //           defaultValue={endingDate}
  //         />
  //         <div
  //           href=""
  //           className="tutor-btn btn btn-primary mb-4"
  //           onClick={editCourseInfo}
  //         >
  //           Edit
  //         </div>

  //         <h4 className="mt-2"> Delete this course</h4>
  //         <div
  //           href=""
  //           className="tutor-btn btn btn-primary mb-4"
  //           onClick={deleteCourse}
  //         >
  //           Delete
  //         </div>

  //         <h4 className="mt-2"> Create Zoom Host Link</h4>
  //         <div
  //           href=""
  //           className="tutor-btn btn btn-primary"
  //           onClick={createZoomHostLink}
  //         >
  //           Create
  //         </div>
  //         <p className="zoomLinkContent">Zoom Link will be pasted here!!</p>

  //         <h4 className="mt-2"> Get Money</h4>
  //         <div
  //           href=""
  //           className="tutor-btn btn btn-primary mb-4"
  //           onClick={getMoney}
  //         >
  //           Get Money
  //         </div>
  //       </React.Fragment>
  //     );
  //   }

  //   return (
  //     <React.Fragment>
  //       <div className="container">
  //         <div className="row">
  //           <div
  //             className="tutor-btn btn btn-primary mt-4 center"
  //             onClick={enrollCourse}
  //           >
  //             Đăng ký
  //           </div>
  //           <div
  //             href=""
  //             className="tutor-btn btn btn-primary"
  //             onClick={joiningCourse}
  //           >
  //             Tham gia
  //           </div>
  //           <div
  //             href=""
  //             className="tutor-btn btn btn-primary"
  //             onClick={createZoomHostLink}
  //           >
  //             Get Zoom Link
  //           </div>
  //           <p className="zoomLinkContentStudent"></p>
  //           <h5 href="">Rating Course</h5>
  //           {renderRadioButton()}
  //         </div>
  //       </div>
  //     </React.Fragment>
  //   );
  // };

  const renderView = () => {
    if (role === "student")
      return (
        <React.Fragment>
          <div className="container container-course">
            <div className="row">
              <div className="card-wrapper col-lg-4">
                <div className="card m-4">
                  <img src={picture} className="card-img-top" alt="..." />
                  <div className="card-body">
                    <h4 className="card-title">{courseName}</h4>
                    <p className="card-text">{description}</p>
                    <div
                      className="enroll-button btn btn-primary mt-4"
                      onClick={enrollCourse}
                    >
                      Enroll
                    </div>
                    <div
                      className="joining-button btn btn-outline-primary mt-2"
                      onClick={joiningCourse}
                    >
                      Joining
                    </div>
                    <div
                      className="rating-button btn btn-light mt-2"
                      onClick={displayRatingCourse}
                    >
                      Rating
                    </div>
                  </div>
                </div>
              </div>

              <div className="card-content col-lg-4 mt-4 pt-2">
                <p className="card-text">
                  <i class="fas fa-chalkboard-teacher mr-2"></i>
                  <b>Tutor:</b> {tutor}
                </p>
                <p className="card-text">
                  <i class="far fa-clock mr-2"></i>
                  <b>Time:</b> {timeStart} - {timeEnd}
                </p>
                <p className="card-text">
                  <i class="fas fa-laptop mr-2"></i>
                  <b>Length :</b> {startingDate} - {endingDate}
                </p>
                <p className="card-text ">
                  <i class="fas fa-dollar-sign mr-2"></i>
                  <b>Fee:</b> <span className="fee-card-text">{fee}</span>
                </p>
                <p className="card-text">
                  <i class="fas fa-calendar mr-2"></i>
                  <b>Day:</b>
                  {listDay.map((day) => {
                    return <span> {day} </span>;
                  })}
                </p>
                <div className="card-content mt-4 notify-message">
                  <form className="form-rating ml-4 mt-3">
                    <p>Please input your rating: (1-5)</p>
                    <div className="form-group">
                      <input
                        type="number"
                        className="form-control mb-2 mt-2"
                        id="star"
                        min="1"
                        max="5"
                      />
                      <input
                        type="button"
                        value="Submit"
                        className="btn btn-primary"
                        onClick={rateCourse}
                      />
                    </div>
                  </form>
                </div>
              </div>

              {/* <div className="control-panel">{renderControlPanel()}</div> */}
              {/* <div className="control-panel col-lg-4">{renderControlPanel()}</div> */}
            </div>
          </div>
        </React.Fragment>
      );
  };
  return (
    // <div className="container container-course">
    //   <div className="row">
    //     <div className="card-wrapper col-lg-4">
    //       <div className="card m-4">
    //         <img src={picture} className="card-img-top" alt="..." />
    //         <div className="card-body">
    //           <h4 className="card-title">{courseName}</h4>
    //           <p className="card-text">{description}</p>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="card-content col-lg-4 mt-4 pt-2">
    //       <p className="card-text">
    //         <i class="fas fa-chalkboard-teacher mr-2"></i>
    //         <b>Tutor:</b> {tutor}
    //       </p>
    //       <p className="card-text">
    //         <i class="far fa-clock mr-2"></i>
    //         <b>Time:</b> {timeStart} - {timeEnd}
    //       </p>
    //       <p className="card-text">
    //         <b>Length :</b> {startingDate} - {endingDate}
    //       </p>
    //       <p className="card-text ">
    //         <i class="fas fa-dollar-sign mr-2"></i>
    //         <b>Fee:</b> <span className="fee-card-text">{fee}</span>
    //       </p>
    //       <p className="card-text">
    //         <i class="fas fa-calendar mr-2"></i>
    //         <b>Day:</b>
    //         {listDay.map((day) => {
    //           return <span> {day} </span>;
    //         })}
    //       </p>
    //     </div>
    //     {/* <div className="control-panel">{renderControlPanel()}</div> */}
    //     {/* <div className="control-panel col-lg-4">{renderControlPanel()}</div> */}
    //   </div>
    // </div>
    <div>{renderView()}</div>
  );
}
export default CourseDetail;
