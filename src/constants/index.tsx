import { IconExplore } from "@/components/icons";
import IconManageComment from "@/components/icons/IconComment";
import IconManageOrder from "@/components/icons/IconOrder";
import IconPlayCircle from "@/components/icons/IconPlay";
import IconManageCourse from "@/components/icons/IconStudy";
import IconManageMember from "@/components/icons/IconUser";
import { TMenuItem } from "@/types";
import { ECourseLevel, ECourseStatus } from "@/types/enums";

export const menuItems: TMenuItem[] = [
	{
		url: "/",
		title: "Khám phá học tập",
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

export const courseStatus: {
	title: string;
	value: ECourseStatus;
	className?: string;
}[] = [
	{
		title: "Đã duyệt",
		value: ECourseStatus.APPROVED,
		className: "text-green-500 bg-green-500",
	},
	{
		title: "Chờ duyệt",
		value: ECourseStatus.PENDING,
		className: "text-orange-500 bg-orange-500",
	},
	{
		title: "Từ chối",
		value: ECourseStatus.REJECTED,
		className: "text-red-500 bg-red-500",
	},
];
export const courseLevel: {
	title: string;
	value: ECourseLevel;
}[] = [
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
export const commonClassName = {
	status:
		"bg-opacity-10 border border-current rounded-md font-medium px-3 py-1 text-sm whitespace-nowrap",
	action:
		"size-8 rounded-md border flex items-center justify-center p-2 text-gray-500 hover:border-opacity-80 dark:bg-transparent borderDarkMode dark:hover:border-opacity-20",
	paginationButton:
		"size-10 rounded-md borderDarkMode bgDarkMode border flex items-center justify-center hover:border-primary transition-all hover:text-primary",
	btnPrimary:
		"flex items-center justify-center w-full mt-10 rounded-lg text-white font-semibold bg-primary h-12 button-primary",
};
