"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";
import { auth } from "@clerk/nextjs/server";
import Course, { ICourse } from "@/database/course.model";
import { ECourseStatus } from "@/types/enums";

export async function createUser(params: TCreateUserParams) {
	try {
		connectToDatabase();
		const newUser: TCreateUserParams = await User.create(params);
		return newUser;
	} catch (err) {
		console.log(err);
	}
}

export async function getUserInfo({
	userId,
}: {
	userId: string;
}): Promise<IUser | null | undefined> {
	try {
		connectToDatabase();

		const findUser = await User.findOne({ clerkId: userId });
		if (!findUser) {
			return null;
		}
		return findUser;
	} catch (err) {
		console.log(err);
	}
}

export async function getUserCourses(): Promise<ICourse[] | undefined | null> {
	try {
		connectToDatabase();
		const { userId } = auth();
		const findUser = await User.findOne({ clerkId: userId }).populate({
			path: "courses",
			model: Course,
			match: {
				status: ECourseStatus.APPROVED,
			},
		});
		if (!findUser) {
			return null;
		}
		return findUser.courses;
	} catch (err) {
		console.log(err);
	}
}
