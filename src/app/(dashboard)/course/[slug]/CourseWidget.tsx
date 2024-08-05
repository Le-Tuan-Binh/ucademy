"use client";

import {
	IconDocument,
	IconPlay,
	IconStudy,
	IconUser,
} from "@/components/icons";
import ButtonEnroll from "./ButtonEnroll";

const CourseWidget = ({ data, findUser }: { data: any; findUser: any }) => {
	return (
		<>
			<div className="bgDarkMode border borderDarkMode rounded-lg p-5">
				<div className="flex items-center gap-2 mb-5">
					<strong className="text-lg lg:text-xl text-primary">
						{data.sale_price.toLocaleString()}đ
					</strong>
					<span className="text-slate-400 text-sm line-through">
						{data.price.toLocaleString()}đ
					</span>
					<span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
						-{Math.floor((data.sale_price / data.price) * 100)}%
					</span>
				</div>
				<h3 className="text-base font-semibold mb-3">Khóa học gồm có:</h3>
				<ul className="flex flex-col gap-3 text-sm text-slate-500 mb-5">
					<li className="flex items-center gap-2">
						<IconPlay className="size-4" />
						<span>30 giờ học theo yêu cầu</span>
					</li>
					<li className="flex items-center gap-2">
						<IconUser className="size-4" />
						<span>Có nhóm hỗ trợ trong quá trình học</span>
					</li>
					<li className="flex items-center gap-2">
						<IconStudy className="size-4" />
						<span>Tài liệu đa dạng, phong phú</span>
					</li>
					<li className="flex items-center gap-2">
						<IconDocument className="size-4" />
						<span>13 tài nguyên trong khóa học</span>
					</li>
				</ul>
				<ButtonEnroll
					user={findUser ? JSON.parse(JSON.stringify(findUser)) : null}
					courseId={data ? JSON.parse(JSON.stringify(data._id)) : null}
					amount={data.sale_price}
				></ButtonEnroll>
			</div>
		</>
	);
};

export default CourseWidget;
