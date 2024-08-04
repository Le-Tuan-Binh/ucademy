"use client";
import { Button } from "@/components/ui/button";
import { IUser } from "@/database/user.model";
import { createOrder } from "@/lib/actions/order.actions";
import { createOrderCourse } from "@/utils";
import { toast } from "react-toastify";

const ButtonEnroll = ({
	user,
	courseId,
	amount,
}: {
	user: IUser | null | undefined;
	courseId: string;
	amount: number;
}) => {
	const handleEnrollCourse = async () => {
		if (!user?.name) {
			toast.error("Vui lòng đăng nhập để mua khóa học");
			return;
		}
		/* Create a new Order */
		const newOrder = await createOrder({
			code: createOrderCourse(),
			user: user._id,
			course: courseId,
			total: amount,
			amount: amount,
		});
		toast.success("Yêu cầu mua khóa học thành công");
	};
	return (
		<Button
			variant={"primary"}
			className="w-full"
			onClick={handleEnrollCourse}
		>
			Mua khóa học
		</Button>
	);
};

export default ButtonEnroll;
