import { IconExplore, IconPlayCircle } from "@/components/icons";

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
		url: "/explore",
		title: "Khám phá",
		icon: <IconExplore className="size-5" />,
	},
];
