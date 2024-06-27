import SideBar from "@/components/layout/Sidebar";

const layout = ({ children }: { children: React.ReactNode }) => {
	return (
		<div className="wrapper grid lg:grid-cols-[300px,minmax(0,1fr)] h-screen">
			<SideBar></SideBar>
			<div></div>
			<main className="p-5">{children}</main>
		</div>
	);
};
export default layout;
