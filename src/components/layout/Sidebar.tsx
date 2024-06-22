/*
Syntax for Creates a React Arrow Function Components: `rafce`
*/

import React from "react";
import { menuItems } from "@/constants";
import { TMenuItem } from "@/types";
import { ActiveLink } from "../common";
import { UserButton } from "@clerk/nextjs";
import { ModeToggle } from "../common/ModeToggle";

const SideBar = () => {
	return (
		<div className="p-5 border-r border-r-gray-200 dark:border-opacity-10 bg-white dark:bg-grayDarker flex flex-col">
			<a href="/" className="font-bold text-3xl inline-block mb-5">
				<span className="text-primary">U</span>
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
				<UserButton />
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
