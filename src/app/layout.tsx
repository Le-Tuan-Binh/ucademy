import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/utils";
import SideBar from "@/components/layout/Sidebar";

export const metadata: Metadata = {
	title: "Ucademy",
	description:
		"Explore a wide range of courses on Ucademy and enhance your skills.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={manrope.className}>
				<div className="wrapper grid grid-cols-[300px,minmax(0,1fr)] h-screen">
					<SideBar></SideBar>
					<main>{children}</main>
				</div>
			</body>
		</html>
	);
}
