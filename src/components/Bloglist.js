import React from "react";
import { Link } from "react-router-dom";

function Bloglist(props) {
	return (
		<div>
			{props.blogs.data.map((blog) => (
				<div className="blog-preview" key={blog.Id}>
					<Link to={`/${blog.Id}`}>
						<h2>{blog.Title}</h2>
					</Link>
				</div>
			))}
		</div>
	);
}

export default Bloglist;
