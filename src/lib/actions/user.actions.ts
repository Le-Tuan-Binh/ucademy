"use server";

import User, { IUser } from "@/database/user.model";
import { connectToDatabase } from "../mongoose";
import { TCreateUserParams } from "@/types";

export default async function createUser(params: TCreateUserParams) {
	try {
		connectToDatabase();
		const newUser: TCreateUserParams = await User.create(params);
		return newUser;
	} catch (err) {
		console.log(err);
	}
}
