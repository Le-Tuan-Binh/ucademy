import PageNotFound from "@/app/not-found";
import { getUserInfo } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs/server";
import LoadingMedia from "./@media/LoadingMedia";
import { Suspense } from "react";
import LoadingOutline from "./@outline/LoadingOutline";
import LessonWrapper from "./LessonWrapper";

const Layout = async ({
	media,
	outline,
}: {
	media: React.ReactNode;
	outline: React.ReactNode;
}) => {
	const { userId } = auth();
	if (!userId) {
		return <PageNotFound />;
	}
	const findUser = await getUserInfo({ userId });
	if (!findUser) {
		return <PageNotFound />;
	}
	return (
		<LessonWrapper>
			<Suspense fallback={<LoadingMedia />}>{media}</Suspense>
			<Suspense fallback={<LoadingOutline />}>{outline}</Suspense>
		</LessonWrapper>
	);
};

export default Layout;
