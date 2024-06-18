import { IconExplore, IconPlayCircle } from "@/components/icons";
import { TMenuItem } from "@/types";

export const menuItems: TMenuItem[] = [
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
