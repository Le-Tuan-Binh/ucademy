import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.actions";
import React from "react";

const page = async () => {
	// const user = await createUser({
	// 	clerkId: "user_2iFGmKamJA0Rmcr5kZJo8LQz7lh",
	// 	email_address: "TBinTB0003@gmail.com",
	// 	name: "Lê Tuấn Bình",
	// 	username: "ltbinh_user",
	// });
	return (
		<div>
			<Heading>Khám phá</Heading>
			<CourseGrid>
				<CourseItem></CourseItem>
				<CourseItem></CourseItem>
				<CourseItem></CourseItem>
			</CourseGrid>
		</div>
	);
};

export default page;
