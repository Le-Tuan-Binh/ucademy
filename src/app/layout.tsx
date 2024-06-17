import type { Metadata } from "next";
import "./globals.css";
import { manrope } from "@/utils";
import SideBar from "@/components/layout/Sidebar";
import { ClerkProvider } from "@clerk/nextjs";

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
		<ClerkProvider>
			<html lang="en">
				<body className={manrope.className}>{children}</body>
			</html>
		</ClerkProvider>
	);
}
