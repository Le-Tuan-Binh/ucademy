import type { Metadata } from "next";
import "./globals.scss";
import { manrope } from "@/utils";
import { ClerkProvider } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/common/ThemeProvider";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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
				<body className={manrope.className}>
					<ThemeProvider
						attribute="class"
						defaultTheme="system"
						enableSystem
						disableTransitionOnChange
					>
						{children}
						<ToastContainer
							autoClose={2000}
							bodyClassName={"text-sm font-medium"}
							position="top-right"
						/>
					</ThemeProvider>
				</body>
			</html>
		</ClerkProvider>
	);
}
