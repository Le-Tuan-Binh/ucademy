import Link from "next/link";
import { IconPlay } from "../icons";
import { cn } from "@/lib/utils";

const LessonItem = ({
	lesson,
	url,
	isActive,
}: {
	lesson: {
		title: string;
		duration: number;
	};
	url?: string;
	isActive?: boolean;
}) => {
	return (
		<div
			className={cn(
				"flex items-center gap-2 bgDarkMode borderDarkMode border rounded-lg p-4 font-medium text-sm",
				isActive ? "text-primary font-semibold pointer-events-none" : ""
			)}
		>
			<IconPlay className="size-5 flex-shrink-0"></IconPlay>
			{url ? (
				<Link href={url} className="line-clamp-1">
					{lesson.title}
				</Link>
			) : (
				<h4 className="line-clamp-1">{lesson.title}</h4>
			)}
			<span className="ml-auto text-xs font-semibold flex-shrink-0">
				{lesson.duration} phút
			</span>
		</div>
	);
};

export default LessonItem;
