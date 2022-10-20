import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";
import Navbar from "./Navbar";

function SignUp() {
	const history = useNavigate();
	const [email, setEmail] = useState("");
	// const [name, setName] = useState("");
	const [password, setPassword] = useState("");
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [phone, setPhone] = useState("");
	const [isErr, setIsErr] = useState(false);

	const click = (event) => {
		event.preventDefault();
		axios
			.post(
				"/api/register",
				{

					email: email,
					first_name: firstName,
					last_name: lastName,
					password: password,
					phone: phone,
				},
				{ withCredentials: true },
			)
			.then((res) => {
				if (res.status === 200) {
					setIsErr(false);
					setEmail("");
					setPassword("");
					history("/login");
				} else {
					console.log("🚀 -------------------------------------------------🚀");
					console.log("🚀 ~ file: SignUp.js ~ line 27 ~ .then ~ res", res);
					console.log("🚀 -------------------------------------------------🚀");
					setIsErr(true);
				}
			})
			.catch((e) => {
				console.log("🚀 ---------------------------------------------🚀");
				console.log("🚀 ~ file: SignUp.js ~ line 39 ~ .then ~ e", e);
				console.log("🚀 ---------------------------------------------🚀");

				setIsErr(true);
			});
	};
	return (
		<>
			<Navbar className="create" />

			<div className="create">
				<h2>SignUp</h2>
				{isErr ? (
					<>
						<div>email exists or passwords don't match </div>
					</>
				) : (
					<></>
				)}
				<form onSubmit={click}>

				<label>First Name</label>
					<input
						required
						value={firstName}
						type="text"
						onChange={(e) => setFirstName(e.target.value)}
					/>
					<label>Last Name</label>
					<input
						required
						value={lastName}
						type="text"
						onChange={(e) => setLastName(e.target.value)}
					/>
					<label>Email</label>
					<input required value={email} onChange={(e) => setEmail(e.target.value)} />


					<label>password</label>
					<input required value={password} type="password" onChange={(e) => setPassword(e.target.value)} />

					
					<label>Phone</label>
					<input
						required
						value={phone}
						type="text"
						onChange={(e) => setPhone(e.target.value)}
					/>

					<button>Submit</button>
				</form>
			</div>
		</>
	);
}

export default SignUp;
