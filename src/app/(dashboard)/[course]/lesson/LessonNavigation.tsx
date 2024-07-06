"use client";

import { IconArrowLeft, IconArrowRight } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

const LessonNavigation = ({
	nextLesson,
	prevLesson,
}: {
	nextLesson: string;
	prevLesson: string;
}) => {
	const router = useRouter();
	return (
		<div className="flex gap-3">
			<Button
				className="p-3 size-10"
				disabled={!prevLesson}
				onClick={() => (!prevLesson ? null : router.push(prevLesson))}
			>
				<IconArrowLeft className="size-5" />
			</Button>
			<Button
				className="p-3 size-10"
				disabled={!nextLesson}
				onClick={() => (!nextLesson ? null : router.push(nextLesson))}
			>
				<IconArrowRight className="size-5" />
			</Button>
		</div>
	);
};

export default LessonNavigation;
