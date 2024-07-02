"use server";

import { TCreateLectureParams, TUpdateLectureParams } from "@/types";
import { connectToDatabase } from "../mongoose";
import Course from "@/database/course.model";
import Lecture from "@/database/lecture.model";
import { revalidatePath } from "next/cache";

export async function createLecture(params: TCreateLectureParams) {
	try {
		connectToDatabase();
		const findCourse = await Course.findById(params.course);
		if (!findCourse) {
			return;
		}
		const newLecture = await Lecture.create(params);
		findCourse.lectures.push(newLecture._id);
		findCourse.save();
		revalidatePath(params.path || "/");
		return {
			success: true,
		};
	} catch (err) {}
}
export async function updateLecture(params: TUpdateLectureParams) {
	try {
		connectToDatabase();
		const res = await Lecture.findByIdAndUpdate(
			params.lectureId,
			params.updateData,
			{
				new: true,
			}
		);
		revalidatePath(params.updateData?.path || "/");
		if (!res) {
			return;
		}
		return {
			success: true,
		};
	} catch (error) {
		console.log(error);
	}
}
