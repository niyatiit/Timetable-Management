/* eslint-disable no-unused-vars */
import "./HomeStyle.css";
import Header from "../../components/Header/Header";

/* https://www.npmjs.com/package/react-calendar to refer this tool */
import Calendar from "react-calendar";
import './../../../node_modules/react-calendar/dist/Calendar.css';
import DayCalendar from "../../components/DayCalendar/DayCalendar";
import { useState } from "react";

const Home = () => {

  const [selectedDate, setSelectedDate] = useState(new Date());

	return (
		<div className="home-container">
      <Header />
      <div className="calendar-container">
        {/* <div className="create-button"> Create </div> */}
        <div className="sidebar">
          <Calendar onChange={setSelectedDate} value={selectedDate} />
        </div>
        <div className="calendar">
          <DayCalendar selectedDate={selectedDate} />
        </div>
      </div>
    </div>
	);
};

export default Home;
