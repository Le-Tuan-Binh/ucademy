"use client";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import Heading from "../common/Heading";
import Image from "next/image";
import { commonClassName, courseStatus } from "@/constants";
import { cn } from "@/lib/utils";
import {
	IconDelete,
	IconEdit,
	IconEye,
	IconLeftArrow,
	IconStudy,
} from "../icons";
import Link from "next/link";
import { ICourse } from "@/database/course.model";
import Swal from "sweetalert2";
import { updateCourse } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import { toast } from "react-toastify";
import { Input } from "../ui/input";
import IconRightArrow from "../icons/IconRightArrow";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
	const handleDeleteCourse = (slug: string) => {
		Swal.fire({
			title: "Are you sure?",
			text: "You won't be able to revert this!",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Yes, delete it!",
		}).then(async (result) => {
			if (result.isConfirmed) {
				await updateCourse({
					slug,
					updateData: {
						status: ECourseStatus.PENDING,
						_destroy: true,
					},
					path: "/manage/course",
				});
				toast.success("Xóa khóa học thành công!");
			}
		});
	};
	const handleChangeStatus = async (slug: string, status: ECourseStatus) => {
		try {
			Swal.fire({
				title: "Are you sure?",
				text: "You won't be able to revert this!",
				icon: "warning",
				showCancelButton: true,
				confirmButtonColor: "#3085d6",
				cancelButtonColor: "#d33",
				confirmButtonText: "Yes, update it!",
			}).then(async (result) => {
				if (result.isConfirmed) {
					await updateCourse({
						slug,
						updateData: {
							status: ECourseStatus.PENDING
								? ECourseStatus.APPROVED
								: ECourseStatus.PENDING,
							_destroy: false,
						},
						path: "/manage/course",
					});
					toast.success("Cập nhật trạng thái khóa học thành công!");
				}
			});
		} catch (e) {}
	};
	return (
		<div>
			<div className="flex items-center justify-between mb-10">
				<Heading>Quản lý khóa học</Heading>
				<div className="w-[300px]">
					<Input placeholder="Tìm kiếm khóa học..."></Input>
				</div>
			</div>
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>Thông tin khóa học</TableHead>
						<TableHead>Giá khóa học</TableHead>
						<TableHead>Trạng thái</TableHead>
						<TableHead>Hành động</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{courses.length > 0 &&
						courses.map((course) => {
							const courseStatusItem = courseStatus.find(
								(item) => item.value === course.status
							);
							return (
								<TableRow key={course.slug}>
									<TableCell>
										<div className="flex items-center gap-3">
											<Image
												alt=""
												src={course.image}
												width={80}
												height={80}
												className="flex-shrink-0 size-16 rounded-lg object-cover"
											></Image>
											<div className="flex flex-col gap-1">
												<h3 className="font-bold text-base">{course.title}</h3>
												<h4 className="text-sm text-slate-500">
													{new Date(course.created_at).toLocaleDateString(
														"vi-VI"
													)}
												</h4>
											</div>
										</div>
									</TableCell>
									<TableCell>
										<span className="font-bold text-base">
											{course.price.toLocaleString("vi-VN")}đ
										</span>
									</TableCell>
									<TableCell>
										<button
											type="button"
											className={cn(
												commonClassName.status,
												courseStatusItem?.className
											)}
											onClick={() =>
												handleChangeStatus(course.slug, course.status)
											}
										>
											{courseStatusItem?.title}
										</button>
									</TableCell>
									<TableCell>
										<div className="flex gap-3">
											<Link
												href={`/manage/course/update-content?slug=${course.slug}`}
												className={commonClassName.action}
											>
												<IconStudy className="size-4" />
											</Link>
											<Link
												href={`/course/${course.slug}`}
												target="_blank"
												className={commonClassName.action}
											>
												<IconEye className="size-4" />
											</Link>
											<Link
												href={`/manage/course/update?slug=${course.slug}`}
												className={commonClassName.action}
											>
												<IconEdit className="size-4" />
											</Link>
											<button
												onClick={() => handleDeleteCourse(course.slug)}
												className={commonClassName.action}
											>
												<IconDelete className="size-4" />
											</button>
										</div>
									</TableCell>
								</TableRow>
							);
						})}
				</TableBody>
			</Table>
			<div className="flex justify-end gap-3 mt-5">
				<button className={commonClassName.paginationButton}>
					<IconLeftArrow className="size-5"></IconLeftArrow>
				</button>
				<button className={commonClassName.paginationButton}>
					<IconRightArrow className="size-5"></IconRightArrow>
				</button>
			</div>
		</div>
	);
};

export default CourseManage;
