import { Calendar } from "@progress/kendo-react-dateinputs";
import { useEffect, useState } from "react";

const CourseScheduleCalendar = (props) => {
  const [bookingDate, setBookingDate] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [bookingTimes, setBookingTimes] = useState([]);

  useEffect(() => {
    if (!bookingDate) return;

    var arr = Array.from(props.data.keys()).filter((value) =>
      value.includes(bookingDate.toDateString().substring(0, 3))
    );

    setBookingTimes(arr);
  }, [bookingDate, props]);

  const onDateChange = (e) => {
    setSelectedTimeSlot(null);
    setBookingDate(e.value);
  };

  return (
    <div className="k-my-8">
      <div className="k-flex k-display-flex k-mb-4 float-right mr-5">
        <div className="k-ml-4 k-display-flex k-flex-col">
          {bookingDate && selectedTimeSlot ? (
            <div>{props.data.get(selectedTimeSlot)}</div>
          ) : null}
          {bookingTimes.map((time) => {
            return (
              <button
                key={time}
                className="k-button k-mb-4 m-2"
                onClick={(e) => setSelectedTimeSlot(time)}
              >
                {time.substring(time.length - 11)}
              </button>
            );
          })}
        </div>
        <Calendar value={bookingDate} onChange={onDateChange} />
      </div>
    </div>
  );
};

export default CourseScheduleCalendar;
