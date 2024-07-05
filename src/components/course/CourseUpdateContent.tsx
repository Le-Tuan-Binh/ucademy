"use client";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import { toast } from "react-toastify";
import { createLecture, updateLecture } from "@/lib/actions/lecture.actions";
import { MouseEvent, useState } from "react";
import Swal from "sweetalert2";
import { TCourseUpdateParams, TUpdateCourseLecture } from "@/types";
import { Input } from "../ui/input";
import { IconCancle, IconCheck, IconDelete, IconEdit } from "../icons";
import { commonClassName } from "@/constants";
import { cn } from "@/lib/utils";
import { createLesson, updateLesson } from "@/lib/actions/lesson.actions";
import { ILesson } from "@/database/lesson.model";
import slugify from "slugify";
import LessonItemUpdate from "../lesson/LessonItemUpdate";
const CourseUpdateContent = ({ course }: { course: TCourseUpdateParams }) => {
	const lectures = course.lectures;
	const handleAddNewLecture = async () => {
		try {
			const res = await createLecture({
				title: "Chương mới",
				course: course._id,
				order: lectures.length + 1,
				path: `/manage/course/update-content?slug=${course.slug}`,
			});
			if (res?.success) {
				toast.success("Thêm chương mới thành công");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleDeleteLecture = async (
		event: MouseEvent<HTMLSpanElement>,
		lectureId: string
	) => {
		event.stopPropagation();
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, delete it!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					const res = await updateLecture({
						lectureId,
						updateData: {
							path: `/manage/course/update-content?slug=${course.slug}`,
							_destroy: true,
						},
					});
					if (res?.success) {
						toast.success("Xóa nội dung chương thành công!");
					}
				}
			});
		} catch (error) {
			console.log(error);
		}
	};
	const handleUpdateLecture = async (
		event: MouseEvent<HTMLSpanElement>,
		lectureId: string,
		lectureTitle: string
	) => {
		event.stopPropagation();
		try {
			const res = await updateLecture({
				lectureId,
				updateData: {
					title: lectureEdit !== "" ? lectureEdit : lectureTitle,
					path: `/manage/course/update-content?slug=${course.slug}`,
				},
			});
			if (res?.success) {
				toast.success("Cập nhật thành công");
				setLectureIdEdit("");
				setLectureEdit("");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleAddNewLesson = async (lectureId: string, courseId: string) => {
		try {
			const result = await createLesson({
				path: `manage/course/update-content?slug=${course.slug}`,
				lecture: lectureId,
				course: courseId,
				title: "Tiêu đề bài học mới",
				slug: `tieu-de-bai-hoc-moi-${new Date()
					.getTime()
					.toString()
					.slice(-3)}`,
			});
			if (result?.success) {
				toast.success("Thêm bài học mới thành công");
			} else {
				toast.error("Thêm bài học mới thất bại!");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const handleUpdateLesson = async (
		e: MouseEvent<HTMLSpanElement>,
		lessonId: string,
		lessonTitle: string
	) => {
		e.stopPropagation();
		try {
			const res = await updateLesson({
				lessonId,
				path: `/manage/course/update-content?slug=${course.slug}`,
				updateData: {
					title: lessonEdit !== "" ? lessonEdit : lessonTitle,
					slug: slugify(lessonEdit, {
						lower: true,
						locale: "vi",
						remove: /[**~.()'"!:@]/g,
					}),
				},
			});
			if (res?.success) {
				toast.success("Cập nhật bài học thành công!");
				setLessonEdit("");
				setLessonIdEdit("");
			}
		} catch (error) {
			console.log(error);
		}
	};
	const [lectureEdit, setLectureEdit] = useState("");
	const [lessonEdit, setLessonEdit] = useState("");
	const [lectureIdEdit, setLectureIdEdit] = useState("");
	const [lessonIdEdit, setLessonIdEdit] = useState("");
	return (
		<div>
			<div className="flex flex-col gap-5">
				{lectures.map((lecture: TUpdateCourseLecture) => (
					<div key={lecture._id}>
						<Accordion
							type="single"
							collapsible={!lectureIdEdit}
							className="w-full"
						>
							<AccordionItem value={lecture._id}>
								<AccordionTrigger>
									<div className="flex items-center gap-3 justify-between w-full pr-5">
										{lecture._id === lectureIdEdit ? (
											<>
												<div
													className="w-full"
													onClick={(event) => event.stopPropagation()}
												>
													<Input
														placeholder="Nội dung chương"
														defaultValue={lecture.title}
														onChange={(event) => {
															setLectureEdit(event.target.value);
														}}
													></Input>
												</div>
												<div className="flex gap-2">
													<span
														className={cn(
															commonClassName.action,
															"text-green-500"
														)}
														onClick={(event) =>
															handleUpdateLecture(
																event,
																lecture._id,
																lecture.title
															)
														}
													>
														<IconCheck />
													</span>
													<span
														className={cn(
															commonClassName.action,
															"text-red-500"
														)}
														onClick={(event) => {
															event.stopPropagation();
															setLectureIdEdit("");
														}}
													>
														<IconCancle />
													</span>
												</div>
											</>
										) : (
											<>
												<div>{lecture.title}</div>
												<div className="flex gap-2">
													<span
														className={cn(
															commonClassName.action,
															"text-blue-500"
														)}
														onClick={(event) => {
															event.stopPropagation();
															setLectureIdEdit(lecture._id);
														}}
													>
														<IconEdit />
													</span>
													<span
														className={cn(
															commonClassName.action,
															"text-red-500"
														)}
														onClick={(event) =>
															handleDeleteLecture(event, lecture._id)
														}
													>
														<IconDelete />
													</span>
												</div>
											</>
										)}
									</div>
								</AccordionTrigger>
								<AccordionContent className="border-none !bg-transparent">
									<div className="flex flex-col gap-5">
										{lecture.lessons.map((lesson: ILesson) => (
											<Accordion
												type="single"
												collapsible={!lessonEdit}
												key={lesson._id}
											>
												<AccordionItem value={lesson._id}>
													<AccordionTrigger>
														<div className="flex items-center gap-3 justify-between w-full pr-5">
															{lesson._id === lessonIdEdit ? (
																<>
																	<div
																		className="w-full"
																		onClick={(event) => event.stopPropagation()}
																	>
																		<Input
																			placeholder="Nội dung bài học"
																			defaultValue={lesson.title}
																			onChange={(event) => {
																				setLessonEdit(event.target.value);
																			}}
																		></Input>
																	</div>
																	<div className="flex gap-2">
																		<span
																			className={cn(
																				commonClassName.action,
																				"text-green-500"
																			)}
																			onClick={(event) =>
																				handleUpdateLesson(
																					event,
																					lesson._id,
																					lesson.title
																				)
																			}
																		>
																			<IconCheck />
																		</span>
																		<span
																			className={cn(
																				commonClassName.action,
																				"text-red-500"
																			)}
																			onClick={(event) => {
																				event.stopPropagation();
																				setLessonIdEdit("");
																			}}
																		>
																			<IconCancle />
																		</span>
																	</div>
																</>
															) : (
																<>
																	<div>{lesson.title}</div>
																	<div className="flex gap-2">
																		<span
																			className={cn(
																				commonClassName.action,
																				"text-blue-500"
																			)}
																			onClick={(event) => {
																				event.stopPropagation();
																				setLessonIdEdit(lesson._id);
																			}}
																		>
																			<IconEdit />
																		</span>
																		<span
																			className={cn(
																				commonClassName.action,
																				"text-red-500"
																			)}
																			// onClick={(event) =>
																			// 	handleDeleteLesson(event, lecture._id)
																			// }
																		>
																			<IconDelete />
																		</span>
																	</div>
																</>
															)}
														</div>
													</AccordionTrigger>
													<AccordionContent>
														<LessonItemUpdate
															lesson={lesson}
														></LessonItemUpdate>
													</AccordionContent>
												</AccordionItem>
											</Accordion>
										))}
									</div>
								</AccordionContent>
							</AccordionItem>
						</Accordion>
						<Button
							onClick={() => handleAddNewLesson(lecture._id, course._id)}
							className="mt-5 ml-auto w-fit block"
						>
							Thêm bài học
						</Button>
					</div>
				))}
			</div>
			<Button onClick={handleAddNewLecture} className="mt-5">
				Thêm chương mới
			</Button>
		</div>
	);
};

export default CourseUpdateContent;
