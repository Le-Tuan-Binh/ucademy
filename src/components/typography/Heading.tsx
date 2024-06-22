import React from "react";
import CourseItem from "../course/CourseItem";

const Heading = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<h1 className="text-3xl font-bold">{children}</h1>
		</div>
	);
};

export default Heading;
