"use client";

import { ILesson } from "@/database/lesson.model";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import Link from "next/link";
import { updateLesson } from "@/lib/actions/lesson.actions";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { editorOptions } from "@/constants";
import { useRef, useEffect, useState } from "react";
import { useTheme } from "next-themes";

const formSchema = z.object({
	slug: z.string().optional(),
	duration: z.number().optional(),
	video_url: z.string().optional(),
	content: z.string().optional(),
});

const LessonItemUpdate = ({ lesson }: { lesson: ILesson }) => {
	const editorRef = useRef<any>(null);
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			slug: lesson.slug,
			duration: lesson.duration,
			video_url: lesson.video_url,
			content: lesson.content,
		},
	});
	const { theme } = useTheme();
	const [editorKey, setEditorKey] = useState(0);

	useEffect(() => {
		setEditorKey((prevKey) => prevKey + 1);
	}, [theme]);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		try {
			const res = await updateLesson({
				lessonId: lesson._id,
				updateData: values,
			});
			if (res?.success) {
				toast.success("Cập nhật khóa học thành công");
			}
		} catch (error) {
			console.log(error);
		} finally {
		}
	}

	return (
		<div>
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)}>
					<div className="grid grid-cols-2 gap-8">
						<FormField
							control={form.control}
							name="slug"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đường dẫn đến bài học</FormLabel>
									<FormControl>
										<Input placeholder="lesson-in-course" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="duration"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Thời lượng</FormLabel>
									<FormControl>
										<Input
											placeholder="duration-of-lesson"
											{...field}
											onChange={(e) => field.onChange(Number(e.target.value))}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="video_url"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Đường dẫn Youtube</FormLabel>
									<FormControl>
										<Input
											placeholder="https://www.youtube.com/watch?v=lesson-name"
											{...field}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<div></div>
						<FormField
							control={form.control}
							name="content"
							render={({ field }) => (
								<FormItem className="col-start-1 col-end-3">
									<FormLabel>Nội dung của bài học</FormLabel>
									<FormControl>
										<Editor
											key={editorKey}
											apiKey={process.env.NEXT_PUBLIC_TINY_MCE_API_KEY}
											onInit={(_evt, editor) => {
												(editorRef.current = editor).setContent(
													lesson.content || ""
												);
											}}
											value={field.value}
											{...editorOptions(field, theme)}
										/>
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<div className="flex justify-end gap-5 items-center mt-8">
						<Button type="submit">Cập nhật</Button>
						<Link href="/" className="text-sm text-slate-600">
							Xem trước
						</Link>
					</div>
				</form>
			</Form>
		</div>
	);
};

export default LessonItemUpdate;
