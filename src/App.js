import "./index.css";
import Home from "./components/Home";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Create from "./components/Create";
import Login from "./components/Login";
import Blogdetails from "./components/Blogdetails";
import SignUp from "./components/SignUp";
import Edit from "./components/Edit";

function App() {
	return (
		<div className="App">
			<div className="content">
				<Router>
					<Routes>
						<Route exact path="/" element={<Home />} />
						<Route exact path="/login" element={<Login />} />
						<Route exact path="/register" element={<SignUp />} />
						<Route path="/Create" element={<Create />} />
						<Route path="/:id" element={<Blogdetails />} />
						<Route path="/edit/:id" element={<Edit />} />
					</Routes>
				</Router>
			</div>
		</div>
	);
}

export default App;
