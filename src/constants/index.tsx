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
		title: "Người mới bắt đầu",
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
	[ECourseLevel.BEGINNER]: "Cơ bản",
	[ECourseLevel.INTERMEDIATE]: "Trung cấp",
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
		"flex items-center justify-center w-full mt-5 rounded-lg text-white font-semibold bg-primary h-12 button-primary",
};
export const editorOptions = (field: any, theme: any) => ({
	initialValue: "",
	onBlur: field.onBlur,
	onEditorChange: (content: any) => field.onChange(content),
	init: {
		codesample_global_prismjs: true,
		skin: theme === "dark" ? "oxide-dark" : "oxide",
		content_css: theme === "dark" ? "dark" : "default",
		height: 300,
		menubar: false,
		plugins: [
			"advlist",
			"autolink",
			"lists",
			"link",
			"image",
			"charmap",
			"preview",
			"anchor",
			"searchreplace",
			"visualblocks",
			"codesample",
			"fullscreen",
			"insertdatetime",
			"media",
			"table",
		],
		toolbar:
			"undo redo | " +
			"codesample | bold italic forecolor | alignleft aligncenter |" +
			"alignright alignjustify | bullist numlist |" +
			"image |" +
			"h1 h2 h3 h4 h5 h6 | preview | fullscreen |" +
			"link",
		content_style: `@import url('https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap');body { font-family: Manrope,Helvetica,Arial,sans-serif; font-size:14px; line-height: 2; padding-bottom: 32px; } img { max-width: 100%; height: auto; display: block; margin: 0 auto; };`,
	},
});
export const lastLessonKey = "lastLesson";
