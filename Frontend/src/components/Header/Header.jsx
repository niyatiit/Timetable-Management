/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import "./HeaderStyle.css";
import { Tooltip as ReactTooltip } from "react-tooltip";
import { useNavigate } from "react-router-dom";
import { logout } from "../../api.js";

const Header = ({ setView, view }) => {
	const today = new Date();
	const formattedDate = today.toLocaleDateString();
	const navigate = useNavigate();

	const behind_change = () => {};
	const ahead_change = () => {};

	const viewChange = (e) => {
		setView(e.target.value);
	};

	useEffect(() => {
		const selector = document.getElementById("views");
		selector.value = view;
	}, [view]);

	const logoutHandler = async () => {
		localStorage.clear();
		await logout();
		navigate("/login");
	};

	return (
		<div className="header-container">
			<div className="header-left">
				<div className="logo-container">
					<img
						src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9diqk263eRrAF-z0Q5aW5-9NEU30kObI4Lg&s"
						alt="Logo"
						className="logo"
					/>
					<label htmlFor="logo">Anudip</label>
				</div>
				<div className="today">
					<div className="button" data-tooltip-id="myTooltip">
						<span>Today</span>
						<ReactTooltip id="myTooltip" place="top" effect="solid">
							{formattedDate}
						</ReactTooltip>
					</div>
				</div>
				<div className="changer">
					<span className="arrow" onClick={behind_change}>
						&#8592;
					</span>
					<span className="arrow" onClick={ahead_change}>
						&#8594;
					</span>
				</div>
			</div>
			<div className="header-right">
				<div className="search">
					<img src="./../../assets/search-icon.png" alt="plz add search img" />
				</div>
				<div>
					<select id="views" className="dropdown" onChange={viewChange}>
						<option value="month">Month</option>
						<option value="week">Week</option>
						<option value="day">Day</option>
					</select>
				</div>
				<button className="logout-btn" onClick={logoutHandler}>Logout</button>
			</div>
		</div>
	);
};

export default Header;
