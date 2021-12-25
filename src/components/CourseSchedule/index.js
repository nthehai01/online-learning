import { get } from "../../utils/ApiCaller";
import { useState, useEffect, useRef } from "react";
import * as React from "react";
import LocalStorageUtils from "../../utils/LocalStorageUtils";
import CourseScheduleCalendar from "./CourseScheduleCalendar";
const CourseSchedule = (props) => {
  const [calendarData, setCalendarData] = useState(new Map());
  const buildMap = (keys, values) => {
    const map = new Map();
    for (let i = 0; i < keys.length; i++) {
      map.set(keys[i], values[i]);
    }
    return map;
  };
  useEffect(() => {
    get("/api/enrolling/my-enrollment", {
      username: LocalStorageUtils.getUser()?.username,
    })
      .then((res) => {
        const temp = [];
        console.log(res.data.content.filter((x) => x != null));
        if (res.data.content.filter((x) => x != null))
          setCalendarData(
            buildMap(
              res.data.content
                .filter((x) => x != null)
                .map(
                  (val) =>
                    val.day + " " + val.time.starting + "-" + val.time.ending
                ),
              res.data.content
                .filter((x) => x != null)
                .map((val) => val.courseName + " - " + val.tutor)
            )
          );
      })
      .catch(console.error());
  }, []);

  return (
    <div>
      <CourseScheduleCalendar data={calendarData} />
    </div>
  );
};
export default CourseSchedule;
