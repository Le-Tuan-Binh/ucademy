"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";

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
