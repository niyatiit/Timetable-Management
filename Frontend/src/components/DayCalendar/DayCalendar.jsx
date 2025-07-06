/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import styles from "./DayCalendarStyle.module.css";

const DayCalendar = ( { selectedDate } ) => {
	const today = new Date();
  const [minutesOfCurrentDay, setMinutesOfCurrentDay] = useState(today.getHours() * 60 + today.getMinutes());
	const monthNames = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];
	const monthName = monthNames[selectedDate.getMonth().toString()];
  const linePos = (minutesOfCurrentDay / 60) * 80.8;

  useEffect(() => {
    const timer = setInterval(() => {
      setMinutesOfCurrentDay(new Date().getHours() * 60 + new Date().getMinutes());
    }, 60000); 
    return () => clearInterval(timer);
  }, []);

	return (
	<div className={styles.dayCalendar}>
  <div className={styles.dayCalendarHeader}>
    <h2>{selectedDate.getDate().toString()}</h2>
    <h3>{monthName}</h3>
  </div>

  <div className={styles.dayCalendarContainer}>
    {today.getDate() === selectedDate.getDate() && (
      <div
        className={styles.currentTimeLine}
        style={{ top: `${linePos}px` }}
      ></div>
    )}

    <table className={styles.hours}>
      {[...Array(23)].map((_, hour) => (
        <tr key={hour + 1} className={styles.hour}>
          {hour + 1 < 12
            ? `${hour + 1} AM`
            : hour + 1 === 12
            ? "12 PM"
            : `${hour + 1 - 12} PM`}
        </tr>
      ))}
    </table>

    <table className={styles.dayCalendarTable}>
      {[...Array(24)].map((_, hour) => (
        <tr key={hour} className={styles.inactiveHour}>
          <td></td>
        </tr>
      ))}
    </table>
  </div>
</div>
	);
};

export default DayCalendar;
