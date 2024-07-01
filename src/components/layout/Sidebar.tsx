"use client";
import { menuItems } from "@/constants";
import { TMenuItem } from "@/types";
import { ActiveLink } from "../common";
import { UserButton, useAuth } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";
import Link from "next/link";
import { IconUser } from "../icons";

const SideBar = () => {
	const { userId } = useAuth();
	return (
		<div className="hidden p-5 bgDarkMode borderDarkMode lg:flex flex-col fixed top-0 left-0 bottom-0 w-[300px]">
			<a href="/" className="font-bold text-3xl inline-block mb-5">
				<span className="text-primary text-4xl">U</span>
				cademy
			</a>
			<ul className="flex flex-col gap-3">
				{menuItems.map((item, index) => (
					<MenuItem
						key={index}
						url={item.url}
						title={item.title}
						icon={item.icon}
					></MenuItem>
				))}
			</ul>
			<div className="mt-auto flex items-center justify-end gap-5">
				<ModeToggle />
				{!userId ? (
					<Link
						href="/sign-in"
						className="size-10 rounded-lg bg-primary text-white flex items-center justify-center p-1"
					>
						<IconUser className="size-5"></IconUser>
					</Link>
				) : (
					<UserButton />
				)}
			</div>
		</div>
	);
};

function MenuItem({ url = "/", title = "", icon }: TMenuItem) {
	return (
		<li>
			<ActiveLink url={url}>
				{icon}
				{title}
			</ActiveLink>
		</li>
	);
}

export default SideBar;
