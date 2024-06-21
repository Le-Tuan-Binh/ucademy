import React from "react";
import CourseItem from "../course/CourseItem";

const Heading = ({ children }: { children: React.ReactNode }) => {
	return (
		<div>
			<h1 className="text-3xl font-bold">{children}</h1>
			<div className="grid grid-cols-3 gap-8 mt-8">
				<CourseItem></CourseItem>
				<CourseItem></CourseItem>
				<CourseItem></CourseItem>
			</div>
		</div>
	);
};

export default Heading;
