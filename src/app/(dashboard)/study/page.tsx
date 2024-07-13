import Heading from "@/components/common/Heading";
import { getUserCourses, getUserInfo } from "@/lib/actions/user.actions";
import StudyCourses from "./StudyCourses";
import PageNotFound from "@/app/not-found";
import { getAllCoursesPublic } from "@/lib/actions/course.actions";
import { EUserRole } from "@/types/enums";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";

const page = async () => {
	// const courses = await getUserCourses();
	const { userId } = auth();
	if (!userId) {
		return redirect("/sign-in");
	}
	const user = await getUserInfo({ userId });
	let courses;
	if (user) {
		if (user.role !== EUserRole.ADMIN) {
			courses = (await getUserCourses()) || [];
		} else {
			courses = (await getAllCoursesPublic({})) || [];
		}
	} else {
		return <PageNotFound />;
	}
	return (
		<div>
			<Heading>Khu vực học tập</Heading>
			<StudyCourses
				courses={courses ? JSON.parse(JSON.stringify(courses)) : []}
			></StudyCourses>
		</div>
	);
};

export default page;
