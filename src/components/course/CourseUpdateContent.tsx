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
import { ILecture } from "@/database/lecture.model";
import { TCourseUpdateParams } from "@/types";
import { Input } from "../ui/input";
import { IconCancle, IconCheck, IconDelete, IconEdit } from "../icons";
import { commonClassName } from "@/constants";
import { cn } from "@/lib/utils";
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
	const [lectureEdit, setLectureEdit] = useState("");
	const [lectureIdEdit, setLectureIdEdit] = useState("");
	return (
		<div>
			<div className="flex flex-col gap-5">
				{lectures.map((lecture: ILecture, index) => (
					<Accordion
						type="single"
						collapsible={!lectureIdEdit}
						className="w-full"
						key={lecture._id}
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
													className={cn(commonClassName.action, "text-red-500")}
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
													className={cn(commonClassName.action, "text-red-500")}
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
							<AccordionContent></AccordionContent>
						</AccordionItem>
					</Accordion>
				))}
			</div>
			<Button onClick={handleAddNewLecture} className="mt-5">
				Thêm chương mới
			</Button>
		</div>
	);
};

export default CourseUpdateContent;
