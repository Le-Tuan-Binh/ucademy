"use client";
import { useEffect, useState } from "react";
import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import { lastLessonKey } from "@/constants";
import { ICourse } from "@/database/course.model";

const StudyCourses = ({
	courses,
}: {
	courses: ICourse[] | null | undefined;
}) => {
	const [lastLesson, setLastLesson] = useState<any[]>([]);

	useEffect(() => {
		if (typeof window !== "undefined") {
			const storedLastLesson = JSON.parse(
				localStorage.getItem(lastLessonKey) || "[]"
			);
			setLastLesson(storedLastLesson);
		}
	}, []);

	if (!courses || courses.length <= 0) return null;

	return (
		<CourseGrid>
			{courses.map((item) => {
				const getLessonUrl = (lectures: any[]) => {
					if (lectures && Array.isArray(lectures) && lectures.length > 0) {
						const firstLecture = lectures[0];
						if (
							firstLecture &&
							firstLecture.lessons &&
							Array.isArray(firstLecture.lessons) &&
							firstLecture.lessons.length > 0
						) {
							return firstLecture.lessons[0].slug;
						}
					}
					return null;
				};
				const lessonSlug = getLessonUrl(item.lectures);
				const url =
					lastLesson.find((el) => el.course === item.slug)?.lesson ||
					`/${item.slug}/lesson?slug=${lessonSlug}`;
				return (
					<CourseItem
						key={item.slug}
						data={item}
						cta="Tiếp tục học"
						url={url}
					/>
				);
			})}
		</CourseGrid>
	);
};

export default StudyCourses;
