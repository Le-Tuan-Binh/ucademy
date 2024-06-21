import Link from "next/link";
import React from "react";
import { IconLeftLongArrow } from "@/components/icons";
const PageNotFound = () => {
	return (
		<div className="flex flex-col items-center justify-center h-screen">
			<h1 className="font-bold text-7xl">404</h1>
			<h2 className="mb-5">Page not found</h2>
			<Link href="/" className="gap-2 flex items-center hover:text-primary">
				<IconLeftLongArrow />
				Trang chủ
			</Link>
		</div>
	);
};

export default PageNotFound;
