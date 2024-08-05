import { fetchOrders } from "@/lib/actions/order.actions";
import OrderManage from "./OrderManage";
import { EOrderStatus } from "@/types/enums";
import PaginationBtn from "@/components/common/PaginationBtn";

const page = async ({
	searchParams,
}: {
	searchParams: {
		page: number;
		search: string;
		status: EOrderStatus;
	};
}) => {
	const orders = await fetchOrders({
		page: searchParams.page || 1,
		limit: 10,
		search: searchParams.search,
		status: searchParams.status,
	});
	return (
		<div>
			<OrderManage
				orders={orders ? JSON.parse(JSON.stringify(orders)) : []}
			></OrderManage>
			
		</div>
	);
};

export default page;
