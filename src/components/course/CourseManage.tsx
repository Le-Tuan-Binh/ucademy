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
	IconPlus,
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
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";

const CourseManage = ({ courses }: { courses: ICourse[] }) => {
	const router = useRouter();
	const pathName = usePathname();
	const searchParams = useSearchParams();

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams.toString());
			params.set(name, value);
			return params.toString();
		},
		[searchParams]
	);
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
				title: "Bạn có chắc muốn thay đổi trạng thái của khóa học này không?",
				icon: "warning",
				showCancelButton: true,
				confirmButtonText: "Cập nhật",
				cancelButtonText: "Hủy",
			}).then(async (result) => {
				if (result.isConfirmed) {
					await updateCourse({
						slug,
						updateData: {
							status:
								status === ECourseStatus.PENDING
									? ECourseStatus.APPROVED
									: ECourseStatus.PENDING,
							_destroy: false,
						},
						path: "/manage/course",
					});
					toast.success("Cập nhật trạng thái khóa học thành công!");
					router.push(`${pathName}?${createQueryString("status", "")}`);
				}
			});
		} catch (e) {}
	};
	const handleSearchCourse = debounce(
		(e: React.ChangeEvent<HTMLInputElement>) => {
			router.push(
				`${pathName}?${createQueryString("search", e.target.value)}`
			);
		},
		500
	);
	const handleSelectStatus = debounce((status: ECourseStatus) => {
		router.push(`${pathName}?${createQueryString("status", status)}`);
	}, 500);
	const [page, setPage] = useState(1);
	const handleChangePage = (type: "prev" | "next") => {
		if (type === "prev" && page === 1) {
			return;
		}
		if (type === "prev") {
			setPage((prev) => prev - 1);
		}
		if (type === "next") {
			setPage((prev) => prev + 1);
		}
	};
	useEffect(() => {
		router.push(`${pathName}?${createQueryString("page", page.toString())}`);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [page]);
	return (
		<>
			<Link
				href="/manage/course/new"
				className="size-10 rounded-full flexCenter bg-primary text-white fixed right-5 bottom-5 hover:animate-spin"
			>
				<IconPlus className="size-6"></IconPlus>
			</Link>
			<div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between mb-10">
				<Heading>Quản lý khóa học</Heading>
				<div className="flex gap-3">
					<div className="w-full lg:w-[300px]">
						<Input
							placeholder="Tìm kiếm khóa học..."
							onChange={(e) => handleSearchCourse(e)}
						></Input>
					</div>
					<Select
						onValueChange={(value) =>
							handleSelectStatus(value as ECourseStatus)
						}
					>
						<SelectTrigger className="w-[180px]">
							<SelectValue placeholder="Chọn trạng thái" />
						</SelectTrigger>
						<SelectContent>
							<SelectGroup>
								{courseStatus.map((status) => (
									<SelectItem value={status.value} key={status.value}>
										{status.title}
									</SelectItem>
								))}{" "}
							</SelectGroup>
						</SelectContent>
					</Select>
				</div>
			</div>
			<Table className="table-responsive">
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
												<h3 className="font-bold text-sm lg:text-base whitespace-nowrap">
													{course.title}
												</h3>
												<h4 className="text-xs lg:text-sm text-slate-500">
													{new Date(
														course.created_at
													).toLocaleDateString("vi-VI")}
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
												handleChangeStatus(
													course.slug,
													course.status
												)
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
												onClick={() =>
													handleDeleteCourse(course.slug)
												}
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
				<button
					className={commonClassName.paginationButton}
					onClick={() => handleChangePage("prev")}
				>
					<IconLeftArrow className="size-5"></IconLeftArrow>
				</button>
				<button
					className={commonClassName.paginationButton}
					onClick={() => handleChangePage("next")}
				>
					<IconRightArrow className="size-5"></IconRightArrow>
				</button>
			</div>
		</>
	);
};

export default CourseManage;
