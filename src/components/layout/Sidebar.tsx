/*
Syntax for Creates a React Arrow Function Components: `rafce`
*/

import React from "react";
import { menuItems } from "@/constants";
import { usePathname } from "next/navigation";
import ActiveLink from "../common/ActiveLink";
import { TMenuItem } from "@/types";

const SideBar = () => {
	return (
		<div className="p-5 border-r border-r-gray-200">
			<a href="/" className="font-bold text-3xl inline-block mb-10">
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
