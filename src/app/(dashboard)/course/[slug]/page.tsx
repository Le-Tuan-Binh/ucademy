import PageNotFound from "@/app/not-found";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

import {
	IconCheck,
	IconDocument,
	IconPlay,
	IconStudy,
	IconUser,
} from "@/components/icons";
import { Button } from "@/components/ui/button";
import { courseLevelTitle } from "@/constants";
import { getCourseBySlug } from "@/lib/actions/course.actions";
import { ECourseStatus } from "@/types/enums";
import Image from "next/image";
import React from "react";
import { ILecture } from "@/database/lecture.model";

const page = async ({
	params,
}: {
	params: {
		slug: string;
	};
}) => {
	const data = await getCourseBySlug({
		slug: params.slug,
	});
	if (!data) {
		return null;
	}
	if (data.status !== ECourseStatus.APPROVED) {
		return <PageNotFound />;
	}
	const videoId = data.intro_url?.split("v=")[1];
	const lectures = data.lectures || [];
	return (
		<div className="wrapper grid lg:grid-cols-[2fr,1fr] g-10 min-h-screen">
			<div>
				<div className="relative aspect-video mb-5">
					{!data.intro_url ? (
						<>
							<iframe
								width="853"
								height="480"
								src={`https://www.youtube.com/embed/${videoId}`}
								className="w-full h-full object-fill"
							></iframe>
						</>
					) : (
						<Image
							src={data.image}
							alt=""
							fill
							className="w-full h-full rounded-lg object-cover"
						></Image>
					)}
				</div>
				<h1 className="font-bold text-3xl mb-5">{data?.title}</h1>
				<BoxSection title="Mô tả">
					<div className="leading-normal">{data.desc}</div>
				</BoxSection>
				<BoxSection title="Thông tin khóa học">
					<div className="grid grid-cols-4 gap-5 mb-10">
						<BoxInfo title="Bài học">75 bài giảng</BoxInfo>
						<BoxInfo title="Lượt xem">{data.views.toLocaleString()}</BoxInfo>
						<BoxInfo title="Trình độ">{courseLevelTitle[data.level]}</BoxInfo>
						<BoxInfo title="Thời lượng">30h45ph</BoxInfo>
					</div>
				</BoxSection>
				<BoxSection title="Nội dung của khóa học">
					<div className="flex flex-col gap-5">
						{lectures.map((lecture: ILecture) => (
							<Accordion
								type="single"
								collapsible
								className="w-full"
								key={lecture._id}
							>
								<AccordionItem value={lecture._id}>
									<AccordionTrigger>
										<div className="flex items-center gap-3 justify-between w-full pr-5">
											<div>{lecture.title}</div>
										</div>
									</AccordionTrigger>
									<AccordionContent></AccordionContent>
								</AccordionItem>
							</Accordion>
						))}
					</div>
				</BoxSection>
				<BoxSection title="Yêu cầu của khóa học">
					{data.info.requirements.map((requirement, index) => (
						<div key={index} className="mb-3 flex items-center gap-2">
							<span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
								<IconCheck className="size-4"></IconCheck>
							</span>
							<span>{requirement}</span>
						</div>
					))}
				</BoxSection>
				<BoxSection title="Lợi ích sau khi hoàn thành khóa học">
					{data.info.benefits.map((benefits, index) => (
						<div key={index} className="mb-3 flex items-center gap-2">
							<span className="flex-shrink-0 size-5 bg-primary text-white p-1 rounded flex items-center justify-center">
								<IconCheck className="size-4"></IconCheck>
							</span>
							<span>{benefits}</span>
						</div>
					))}
				</BoxSection>
				<BoxSection title="Q&A">
					{data.info.qa.map((qa, index) => (
						<Accordion type="single" collapsible key={index}>
							<AccordionItem value={qa.question}>
								<AccordionTrigger>{qa.question}</AccordionTrigger>
								<AccordionContent>{qa.answer}</AccordionContent>
							</AccordionItem>
						</Accordion>
					))}
				</BoxSection>
			</div>
			<div className="div">
				<div className="bg-white rounded-lg p-5">
					<div className="flex items-center gap-2 mb-3">
						<strong className="text-primary text-xl font-bold">
							{data.sale_price.toLocaleString()}đ
						</strong>
						<span className="text-slate-400 text-sm line-through">
							{data.price.toLocaleString()}đ
						</span>
						<span className="ml-auto inline-block px-3 py-1 rounded-lg bg-primary text-primary bg-opacity-10 font-semibold text-sm">
							{Math.floor((data.sale_price / data.price) * 100)}%
						</span>
					</div>
					<h3 className="font-bold mb-3 text-sm">Khóa học gồm có:</h3>
					<ul className="mb-3 flex flex-col gap-3 text-sm text-slate-500">
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

					<Button variant={"primary"} className="w-full">
						Mua khóa học
					</Button>
				</div>
			</div>
		</div>
	);
};

function BoxSection({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<>
			<h2 className="font-bold text-xl mb-5">{title}</h2>
			<div className="mb-10">{children}</div>
		</>
	);
}
function BoxInfo({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<div className="bg-white rounded-lg p-5">
			<h4 className="text-sm text-slate-400 font-normal">{title}</h4>
			<h3 className="font-bold">{children}</h3>
		</div>
	);
}
export default page;
