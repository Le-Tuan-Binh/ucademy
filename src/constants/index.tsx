import {
	IconPlayCircle,
	IconExplore,
	IconManageCourse,
	IconManageMember,
	IconManageOrder,
	IconManageComment,
} from "@/components/icons";
import { TMenuItem } from "@/types";

export const menuItems: TMenuItem[] = [
	{
		url: "/",
		title: "Khám phá",
		icon: <IconExplore className="size-5" />,
	},
	{
		url: "/study",
		title: "Khu vực học tập",
		icon: <IconPlayCircle className="size-5" />,
	},
	{
		url: "/manage/course",
		title: "Quản lý khóa học",
		icon: <IconManageCourse className="size-5" />,
	},
	{
		url: "/manage/member",
		title: "Quản lý thành viên",
		icon: <IconManageMember className="size-5" />,
	},
	{
		url: "/manage/order",
		title: "Quản lý đơn hàng",
		icon: <IconManageOrder className="size-5" />,
	},
	{
		url: "/manage/comment",
		title: "Quản lý bình luận",
		icon: <IconManageComment className="size-5" />,
	},
];
