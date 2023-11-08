import { getHistory, type GetHistoryOrder } from '$lib/handler/bill/checkout';
import { createHistory, type CreateHistoryProps } from '$lib/handler/bill/checkout';
import { getId } from '$lib/handler/customer';
import { deleteOrder, getOrders } from '$lib/handler/order';
import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const searchParams = url.searchParams;
	let params: GetHistoryOrder = {
		id: searchParams.get('id') as GetHistoryOrder['id']
	};

	const { data, error } = await awesome(() => getHistory(params));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const { table_id, ...rest } = (await request.json()) as {
		table_id: string;
	};

	const { data: customer_id, error: errorCustomer_id } = await awesome(() => getId({ table_id }));
	if (errorCustomer_id) return Response.json(errorCustomer_id, { status: 400 });
	if (!customer_id) return Response.json('No customer found', { status: 400 });

	const { data: orders, error: orderError } = await awesome(() => getOrders({ table_id }));
	if (orderError) return Response.json(orderError, { status: 400 });

	type Menus = {
		menu: string;
		portion: number;
		price: number;
	};
	const menus = orders.reduce((result, next) => {
		result.push({
			menu: next.menu,
			portion: next.portion,
			price: next.price
		});
		return result;
	}, [] as Menus[]);

	const { data, error } = await awesome(() =>
		createHistory({
			customer_id,
			menus
		})
	);

	if (error) return Response.json(error, { status: 400 });

	const { error: errorDeleteOrder } = await awesome(() => deleteOrder({ table_id }));
	if (errorDeleteOrder) return Response.json(error, { status: 400 });

	// const { } = await awesome(() => updateCustomer())

	return Response.json(data);
};
