/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import styles from "./HeaderStyle.module.css";
import { Tooltip as ReactTooltip } from "react-tooltip";

const Header = ({ setView, view }) => {
  const today = new Date();
  const formattedDate = today.toLocaleDateString();

  const behind_change = () => {};
  const ahead_change = () => {};

  const viewChange = (e) => {
    setView(e.target.value);
  };

  useEffect(() => {
    const selector = document.getElementById("views");
    selector.value = view;
  }, [view]);

  return (
    <div className={styles.headerContainer}>
      <div className={styles.headerLeft}>
        <div className={styles.logoContainer}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9diqk263eRrAF-z0Q5aW5-9NEU30kObI4Lg&s"
            alt="Logo"
            className={styles.logo}
          />
          
        </div>

        <div className={styles.today}>
          <div className={styles.button} data-tooltip-id="myTooltip">
            <span>Today</span>
            <ReactTooltip id="myTooltip" place="top" effect="solid">
              {formattedDate}
            </ReactTooltip>
          </div>
        </div>

        <div className={styles.changer}>
          <span className={styles.arrow} onClick={behind_change}>
            &#8592;
          </span>
          <span className={styles.arrow} onClick={ahead_change}>
            &#8594;
          </span>
        </div>
      </div>

      <div className={styles.headerRight}>
        <div className={styles.search}>
          <input type="text" placeholder="Search Here..." />
          <img src="https://img.icons8.com/ios-filled/24/ffffff/search--v1.png" alt="plz add search img" />
        </div>

        <div>
          <select id="views" className={styles.dropdown} onChange={viewChange}>
            <option value="month">Month</option>
            <option value="week">Week</option>
            <option value="day">Day</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default Header;
