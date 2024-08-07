"use server";

import Coupon, { ICoupon } from "@/database/coupon.model";
import {
	TCouponParams,
	TCreateCouponParams,
	TUpdateCouponParams,
} from "@/types";
import { revalidatePath } from "next/cache";
import { connectToDatabase } from "../mongoose";

export async function createCoupon(params: TCreateCouponParams) {
	try {
		connectToDatabase();
		const existingCoupon = await Coupon.findOne({ code: params.code });
		if (existingCoupon?.code) {
			return { error: "Mã giảm giá đã tồn tại!" };
		}
		const couponRegex = /^[A-Z0-9]{3,20}$/;
		if (!couponRegex.test(params.code)) {
			return { error: "Mã giảm giá không hợp lệ" };
		}
		const newCoupon = await Coupon.create(params);
		revalidatePath("/manage/coupon");
		return JSON.parse(JSON.stringify(newCoupon));
	} catch (error) {
		console.log(error);
	}
}
export async function updateCoupon(params: TUpdateCouponParams) {
	try {
		connectToDatabase();
		const updatedCoupon = await Coupon.findByIdAndUpdate(
			params._id,
			params.updateData
		);
		revalidatePath("/manage/coupon");
		return JSON.parse(JSON.stringify(updatedCoupon));
	} catch (error) {
		console.log(error);
	}
}
export async function getCoupons(params: any): Promise<ICoupon[] | undefined> {
	try {
		connectToDatabase();
		const coupons = await Coupon.find(params);
		return JSON.parse(JSON.stringify(coupons));
	} catch (error) {
		console.log(error);
	}
}
export async function getCouponByCode(
	params: any
): Promise<TCouponParams | undefined> {
	try {
		connectToDatabase();
		const coupon = await Coupon.findOne({
			code: params.code,
		}).populate({
			path: "courses",
			select: "_id title",
		});
		return JSON.parse(JSON.stringify(coupon));
	} catch (error) {
		console.log(error);
	}
}
export async function deleteCoupon(code: string) {
	try {
		connectToDatabase();
		await Coupon.findOneAndDelete({ code });
		revalidatePath("/manage/coupon");
	} catch (error) {
		console.log(error);
	}
}
