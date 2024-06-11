import type { Metadata } from "next";
import "./globals.css";
import { manrope, roboto } from "@/components/font";

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
			<body className={`${manrope.variable} ${roboto.variable}`}>
				{children}
			</body>
		</html>
	);
}
