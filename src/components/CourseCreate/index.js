import { get } from "../../utils/ApiCaller";
import { useState, useEffect, useRef } from "react";
import CourseCard from "../CourseCard/CourseCard";
import * as React from "react";
import { alpha, styled } from "@mui/material/styles";
import { post } from "../../utils/ApiCaller";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import {
  CircularProgress,
  TextField,
  Button,
  Backdrop,
  Box,
  Modal,
  Fade,
  Typography,
} from "@mui/material";
import MultipleSelectCheckmarks from "./MultipleSelectCheckmarks";

const CourseCreate = (props) => {
  const courseName = useRef();
  const courseSlug = useRef();
  const courseFee = useRef();
  const courseDescription = useRef();
  const courseUrl = useRef();
  const courseStart = useRef();
  const courseEnd = useRef();
  const courseTimeStart = useRef();
  const courseTimeEnd = useRef();
  var courseWeekday = [];
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isLoading, setIsLoading] = useState(true);
  const [dataContent, setDataContent] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    get("/api/courses/my-courses", {
      username: LocalStorageUtils.getUser(),
    })
      .then((res) => setDataContent(res.data.content))
      .then(() => setIsLoading(false));
  }, []);
  const setCourseWeekday = (value) => {
    courseWeekday = value;
  };
  const createNewCourse = () => {
    var url = courseUrl.current.value === "" ? "#" : courseUrl.current.value;
    var body = {
      courseName: courseName.current.value,
      slug: courseSlug.current.value,
      description: courseDescription.current.value,
      fee: courseFee.current.value - 0,
      picture: url,
      tutor: LocalStorageUtils.getUser(),
      time: {
        starting: courseTimeStart.current.value,
        ending: courseTimeEnd.current.value,
      },
      day: courseWeekday,
      startingDate: courseStart.current.value,
      endingDate: courseEnd.current.value,
    };
    post("/api/courses/create", body);
  };
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 600,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    textAlign: "center",
  };
  const RedditTextField = styled((props) => {
    return <TextField InputProps={{ disableUnderline: true }} {...props} />;
  })(({ theme }) => ({
    "& .MuiFilledInput-root": {
      border: "1px solid #e2e2e1",
      overflow: "hidden",
      borderRadius: 4,
      backgroundColor: theme.palette.mode === "light" ? "#fcfcfb" : "#2b2b2b",
      transition: theme.transitions.create([
        "border-color",
        "background-color",
        "box-shadow",
      ]),
      "&:hover": {
        backgroundColor: "transparent",
      },
      "&.Mui-focused": {
        backgroundColor: "transparent",
        boxShadow: `${alpha(theme.palette.primary.main, 0.25)} 0 0 0 2px`,
        borderColor: theme.palette.primary.main,
      },
    },
  }));
  return (
    <>
      <div className="title m-1 mt-4 mb-4">
        Các khóa học đã tạo
        <Button
          className="addbutton ml-3"
          variant="contained"
          component="span"
          onClick={handleOpen}
        >
          <i className="bi bi-plus-lg"></i>
        </Button>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={open}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={open}>
            <Box sx={style}>
              <Typography
                id="transition-modal-title"
                variant="h6"
                component="h2"
              >
                Nhập thông tin khóa học
              </Typography>
              <RedditTextField
                label="Tên khóa học"
                id="name"
                variant="filled"
                style={{ marginTop: 11, width: 300 }}
                inputRef={courseName}
              />
              <RedditTextField
                label="Học phí (VND)"
                id="fee"
                variant="filled"
                style={{ marginTop: 11, marginLeft: 10, width: 200 }}
                inputRef={courseFee}
              />
              <RedditTextField
                label="Nhập mô tả"
                id="name"
                variant="filled"
                style={{ marginTop: 11, width: 300 }}
                inputRef={courseDescription}
              />
              <RedditTextField
                label="Nhập link ảnh nếu có"
                id="fee"
                variant="filled"
                style={{ marginTop: 11, marginLeft: 10, width: 200 }}
                inputRef={courseUrl}
              />
              <TextField
                id="date_start"
                label="Ngày bắt đầu"
                type="date"
                defaultValue="2021-01-31"
                style={{ marginTop: 11, width: 170 }}
                inputRef={courseStart}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="date_end"
                label="Ngày kết thúc"
                type="date"
                defaultValue="2021-12-01"
                style={{ marginTop: 11, marginLeft: 10, width: 170 }}
                inputRef={courseEnd}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <RedditTextField
                label="Tên miền"
                placeholder="toeic"
                id="slug"
                variant="filled"
                style={{ marginTop: 11, marginLeft: 10, width: 150 }}
                inputRef={courseSlug}
              />
              <br />
              <TextField
                id="time_start"
                label="Từ"
                type="time"
                defaultValue="07:00"
                style={{ marginTop: 11, width: 170 }}
                inputRef={courseTimeStart}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <TextField
                id="time_end"
                label="Đến"
                type="time"
                defaultValue="10:00"
                style={{ marginTop: 11, marginLeft: 10, width: 170 }}
                inputRef={courseTimeEnd}
                InputLabelProps={{
                  shrink: true,
                }}
              />
              <MultipleSelectCheckmarks passData={setCourseWeekday} />
              <Button
                className="mt-3"
                variant="contained"
                style={{ marginTop: 11, marginLeft: 100, width: 300 }}
                onClick={() => {
                  handleClose();
                  createNewCourse();
                }}
              >
                Tạo khóa học
              </Button>
              <Button
                className="ml-3 mt-3"
                variant="contained"
                onClick={handleClose}
                style={{ marginTop: 11, marginLeft: 100, width: 100 }}
              >
                Huỷ
              </Button>
            </Box>
          </Fade>
        </Modal>
      </div>
      {!isLoading &&
        dataContent.length > 0 &&
        dataContent.map((dataDetail) => (
          <CourseCard dat={dataDetail} key={dataDetail._id} />
        ))}
      {!isLoading && dataContent.length === 0 && (
        <div className="ml-2">Bạn chưa tạo khóa học nào!</div>
      )}
      {isLoading && <CircularProgress />}
    </>
  );
};
export default CourseCreate;
