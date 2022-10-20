import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import Navbar from "./Navbar";

function Blogdetails() {
	const history = useNavigate();
	const { id } = useParams();
	const [showDelete, setShowDelete] = useState();
	const [data, setData] = useState();
	const [err, setError] = useState();
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		axios
			.get(`/api/blog/${id}`, {
				withCredentials: true,
			})
			.then((res) => {
				console.log("AMRRR", id , res)
				if (res.status === 200) {
					setData(res.data.data);
				} else {
					setError("you are not allowed to log in");
				}
			})
			.catch((e) => {
				console.log("🚀 ------------------------------------------------------🚀");
				console.log("🚀 ~ file: Blogdetails.js ~ line 29 ~ useEffect ~ e", e);
				console.log("🚀 ------------------------------------------------------🚀");
				setError(e.message);
			});
	}, [id]);
	useEffect(() => {
		setLoading(true);
		if (data) {
			axios
				.get("/api/getuser", {
					withCredentials: true,
				})
				.then((res) => {
					if (res.status === 200) {
						setShowDelete(res.data.user.Id === data.User.Id);
					} else {
						setError("you are not allowed to log in");
					}
				})
				.catch((e) => {
					console.log("🚀 ------------------------------------------------------🚀");
					console.log("🚀 ~ file: Blogdetails.js ~ line 51 ~ useEffect ~ e", e);
					console.log("🚀 ------------------------------------------------------🚀");
				});
			setLoading(false);
		}
	}, [data]);

	const click = async () => {
		setLoading(true);
		try {
			await axios.delete(`/api/blog/${id}`, {
				withCredentials: true,
			});
			history("/");
		} catch (e) {
			console.log("🚀 --------------------------------------------------🚀");
			console.log("🚀 ~ file: Blogdetails.js ~ line 65 ~ click ~ e", e);
			console.log("🚀 --------------------------------------------------🚀");

			setError(e.message);
		}
		setLoading(false);
	};
	return (
		<>
			<Navbar />
			<div className="blog-details">
				{loading && <div>Loading...</div>}
				{err && <div>{err}</div>}
				{data && (
					<article>
						<h2>{data.Title}</h2>
						<div>{data.Desc}</div>
					</article>
				)}
				{showDelete && <button onClick={click}>Delete</button>}
				{showDelete && <Link to={`/edit/${data.Id}`}><button>edit</button></Link>}
			</div>
		</>
	);
}

export default Blogdetails;
