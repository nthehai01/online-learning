import React from "react";

import "./CourseHistoryFilter.css";

const CourseHistoryFilter = (props) => {
  const dropdownChangeHandler = (event) => {
    props.onChangeFilter(event.target.value);
  };

  return (
    <div className="courses-filter my-4">
      <div className="courses-filter__control">
        <select value={props.selected} onChange={dropdownChangeHandler}>
          <option value="all">-- Tất cả khóa học --</option>
          {props.options.map((opt) => (
            <option value={opt} key={opt}>
              {opt.toUpperCase()}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CourseHistoryFilter;
