/* eslint-disable no-unused-vars */
import "./DayCalendarStyle.css";

const DayCalendar = () => {
  
  const today = new Date();
  const date = today.getDate().toString();
  const monthNames = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];
  const monthName = monthNames[today.getMonth().toString()];
  console.log(monthName)

	return (
    <div className="day-calendar">
      <div className="day-calendar-header">
        <h2>{date}</h2>
        <h3>{monthName}</h3>
      </div>
      <div className="day-calendar-container">
        <div className="hours">
          {[...Array(23)].map((_, hour) => (
            <div key={hour+1} className="hour">
              {hour+1}
            </div>
          ))}
        </div>
        <table>
          {[...Array(24)].map((_, hour) => (
            <tr key={hour}>
              <td></td>
            </tr>
          ))}
        </table>
      </div>
    </div>
	);
};

export default DayCalendar;
