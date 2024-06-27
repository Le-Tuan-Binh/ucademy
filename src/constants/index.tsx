import {
	IconPlayCircle,
	IconExplore,
	IconManageCourse,
	IconManageMember,
	IconManageOrder,
	IconManageComment,
} from "@/components/icons";
import { TMenuItem } from "@/types";
import { ECourseLevel, ECourseStatus } from "@/types/enums";

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

export const courseStatus = [
	{
		title: "Đã duyệt",
		value: ECourseStatus.APPROVED,
	},
	{
		title: "Chờ duyệt",
		value: ECourseStatus.PENDING,
	},
	{
		title: "Từ chối",
		value: ECourseStatus.REJECTED,
	},
];
export const courseLevel = [
	{
		title: "Dành cho người mới bắt đầu",
		value: ECourseLevel.BEGINNER,
	},
	{
		title: "Cơ bản",
		value: ECourseLevel.INTERMEDIATE,
	},
	{
		title: "Nâng cao",
		value: ECourseLevel.ADVANCED,
	},
];

export const courseLevelTitle: Record<ECourseLevel, string> = {
	[ECourseLevel.BEGINNER]: "Dành cho người mới bắt đầu",
	[ECourseLevel.INTERMEDIATE]: "Cơ bản",
	[ECourseLevel.ADVANCED]: "Nâng cao",
};
