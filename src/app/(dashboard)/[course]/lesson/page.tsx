import PageNotFound from "@/app/not-found";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { findAllLesson, getLessonBySlug } from "@/lib/actions/lesson.actions";
import LessonNavigation from "./LessonNavigation";
import Heading from "@/components/common/Heading";
import LessonContent from "@/components/lesson/LessonContent";
import { getHistory } from "@/lib/actions/history.actions";
import { auth } from "@clerk/nextjs/server";
import { getUserInfo } from "@/lib/actions/user.actions";
import LessonSaveUrl from "./LessonSaveUrl";

const page = async ({
	params,
	searchParams,
}: {
	params: {
		course: string;
	};
	searchParams: {
		slug: string;
	};
}) => {
	const { userId } = auth();
	if (!userId) {
		return <PageNotFound />;
	}
	const findUser = await getUserInfo({ userId });
	if (!findUser) {
		return <PageNotFound />;
	}
	const course = params.course;
	const slug = searchParams.slug;
	if (!course || !slug) {
		return <PageNotFound />;
	}
	const findCourse = await getCourseBySlug({ slug: course });
	if (!findCourse) {
		return <PageNotFound />;
	}
	const courseId = findCourse?._id.toString();
	if (
		!findUser.courses.includes(courseId as any)
		// && findUser.role !== EUserRole.ADMIN
	) {
		return <PageNotFound />;
	}
	const lessonDetails = await getLessonBySlug({
		slug,
		course: courseId || "",
	});
	const lessonList = await findAllLesson({ course: courseId || "" });
	if (!lessonDetails) {
		return <PageNotFound />;
	}
	const currentLessonIndex =
		lessonList?.findIndex((el) => el.slug === lessonDetails.slug) || 0;
	const nextLesson = lessonList?.[currentLessonIndex + 1];
	const prevLesson = lessonList?.[currentLessonIndex - 1];
	const videoId = lessonDetails.video_url?.split("/").at(-1);
	const lectures = findCourse.lectures || [];
	const histories = await getHistory({ course: courseId });
	const completePercentage =
		((histories?.length || 0) / (lessonList?.length || 1)) * 100;
	return (
		<div className="block xl:grid xl:grid-cols-[minmax(0,2fr),minmax(0,1.2fr)] gap-5 min-h-screen items-start">
			<LessonSaveUrl
				url={`/${course}/lesson?slug=${slug}`}
				course={course}
			></LessonSaveUrl>
			<div>
				<div className="relative mb-5 aspect-video">
					<iframe
						src={`https://www.youtube.com/embed/${videoId}`}
						className="w-full h-full object-fill"
					/>
				</div>
				<div className="flex items-center justify-between mb-5">
					<LessonNavigation
						nextLesson={
							!nextLesson
								? ""
								: `/${course}/lesson?slug=${nextLesson?.slug}`
						}
						prevLesson={
							!prevLesson
								? ""
								: `/${course}/lesson?slug=${prevLesson?.slug}`
						}
					></LessonNavigation>
					<div></div>
				</div>
				<Heading className="mb-5">{lessonDetails.title}</Heading>
				<div className="p-5 rounded-lg bgDarkMode border borderDarkMode entry-content">
					<div
						dangerouslySetInnerHTML={{
							__html: lessonDetails.content || "",
						}}
					></div>
				</div>
			</div>
			<div className="sticky top-5 right-0 max-h-[calc(100svh-100px)] overflow-y-auto">
				<div className="h-3 w-full rounded-full border borderDarkMode bgDarkMode mb-2">
					<div
						className="w-0 h-full rounded-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
						style={{
							width: `${completePercentage}%`,
						}}
					></div>
				</div>
				<LessonContent
					lectures={lectures}
					course={course}
					slug={slug}
					histories={
						histories ? JSON.parse(JSON.stringify(histories)) : []
					}
				></LessonContent>
			</div>
		</div>
	);
};

export default page;
