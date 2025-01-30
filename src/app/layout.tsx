import type { Metadata } from "next";
import "./globals.css";
import { manrope, roboto } from "@/styles/fonts";

export const metadata: Metadata = {
	title: "Ucademy",
	description:
		"Ucademy is an innovative platform for online learning, offering a wide range of courses and resources to help you master new skills and advance your career.",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={`${manrope.variable} ${roboto.variable} antialiased`}>
				{children}
			</body>
		</html>
	);
}
