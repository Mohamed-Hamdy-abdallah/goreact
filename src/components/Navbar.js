import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [err, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const history = useNavigate();
	

	useEffect(() => {
		console.log(document.cookie)
		setLoading(true);
		axios
			.get("/api/getuser", {
				withCredentials: true,
			
			})
			.then((res) => {
				console.log("🚀 -------------------------------------------------🚀");
				console.log("🚀 ~ file: Navbar.js ~ line 17 ~ .then ~ res", res);
				console.log("🚀 -------------------------------------------------🚀");
				if (res.status !== 200) {
				setIsLoggedIn(false)
				} else {
					setIsLoggedIn(true);
				}
			})
			.catch((e) => {
				console.log("🚀 -------------------------------------------------🚀");
				console.log("🚀 ~ file: Navbar.js ~ line 36 ~ useEffect ~ e", e);
				console.log("🚀 -------------------------------------------------🚀");
			});

		setLoading(false);
	}, [isLoggedIn]);
	const handleLogOut = (e) => {
		e.preventDefault();
		axios.get("/api/logout", { withCredentials: true }).then((res) => {
			console.log("🚀 -----------------------------------------------------🚀");
			console.log("🚀 ~ file: Navbar.js ~ line 53 ~ axios.get ~ res", res);
			console.log("🚀 -----------------------------------------------------🚀");

			if (res.status === 200) {
				setIsLoggedIn(false);
				history("/");
			} else {
				console.log("🚀 ------------------------------------------------🚀");
				console.log("🚀 ~ file: Login.js ~ line 19 ~ click ~ res", res);
				console.log("🚀 ------------------------------------------------🚀");
			}
		});
	};

	if (loading)
		return (
			<>
				<Navbar className="create" />
				<div className="create">Loading...</div>
			</>
		);
		function deleteAllCookies() {
			var cookies = document.cookie.split(";");
		
			for (var i = 0; i < cookies.length; i++) {
				var cookie = cookies[i];
				var eqPos = cookie.indexOf("=");
				var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
				document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
			}
			setIsLoggedIn(false);
			history("/");
			history(0)
		}

	return (
		<nav className="navbar">
			<h1>The Blog</h1>
			<div className="links">
				<Link to="/">Home</Link>
				{!isLoggedIn ? <Link to="/login"> Login </Link> : <></>}
				{!isLoggedIn ? <Link to="/register">Sign Up</Link> : <></>}
				<Link to="/Create">New Blog</Link>
			</div>
			<div className="blog-details" style={{ marginLeft: "40px" }}>
				{isLoggedIn ? <button onClick={deleteAllCookies}>log out</button> : <></>}
			</div>
		</nav>
	);
}

export default Navbar;
