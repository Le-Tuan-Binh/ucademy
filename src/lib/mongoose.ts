"use server";

import mongoose from "mongoose";

// Singleton Design Pattern
let isConnected: boolean = false;
export const connectToDatabase = async () => {
	if (!process.env.MONGODB_URL) {
		throw new Error("Database is not defined");
	}
	if (isConnected) {
		console.log("Connection to database is exist");
		return;
	}
	try {
		await mongoose.connect(process.env.MONGODB_URL, {
			dbName: "Ucademy",
		});
		isConnected = true;
		console.log("Connection to database successful");
	} catch (error) {
		console.log("Error while connecting to database");
	}
};
