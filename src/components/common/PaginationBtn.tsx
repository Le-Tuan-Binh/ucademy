import { commonClassName } from "@/constants";
import { IconArrowLeft, IconArrowRight } from "../icons";

const PaginationBtn = () => {
	return (
		<div className="flex justify-end gap-3 mt-5">
			<button className={commonClassName.paginationButton}>
				<IconArrowLeft />
			</button>
			<button className={commonClassName.paginationButton}>
				<IconArrowRight />
			</button>
		</div>
	);
};

export default PaginationBtn;
