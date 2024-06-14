import IconExplore from "@/components/icons/IconExplore";
import IconPlayCircle from "@/components/icons/IconPlayCircle";

export const menuItems: {
	url: string;
	title: string;
	icon: React.ReactNode;
}[] = [
	{
		url: "/",
		title: "Trang chủ",
		icon: <IconPlayCircle className="size-5" />,
	},
	{
		url: "/",
		title: "Khám phá",
		icon: <IconExplore className="size-5" />,
	},
];
