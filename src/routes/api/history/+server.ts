import { getHistory, type GetHistoryOrder } from '$lib/handler/bill/checkout';
import { createHistory, type CreateHistoryProps } from '$lib/handler/bill/checkout';
import { getId } from '$lib/handler/customer';
import { deleteOrder, getOrders } from '$lib/handler/order';
import { awesome } from '@dookdiks/utils';
import type { RequestHandler } from './$types';

/**
 * Handles the GET request for retrieving history orders.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const GET: RequestHandler = async ({ url }) => {
	const searchParams = url.searchParams;
	let params: GetHistoryOrder = {
		id: searchParams.get('id') as GetHistoryOrder['id']
	};

	const { data, error } = await awesome.async(() => getHistory(params));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the POST request for creating a history entry.
 * @param {Request} request - The request object.
 * @returns {Response} The response object.
 */
export const POST: RequestHandler = async ({ request }) => {
	const { table_id, ...rest } = (await request.json()) as {
		table_id: string;
	};

	const { data: customer_id, error: errorCustomer_id } = await awesome.async(() =>
		getId({ table_id })
	);
	if (errorCustomer_id) return Response.json(errorCustomer_id, { status: 400 });
	if (!customer_id) return Response.json('No customer found', { status: 400 });

	const { data: orders, error: orderError } = await awesome.async(() => getOrders({ table_id }));
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
			price: 0
		});
		return result;
	}, [] as Menus[]);

	const { data, error } = await awesome.async(() =>
		createHistory({
			customer_id,
			menus
		})
	);

	if (error) return Response.json(error, { status: 400 });

	const { error: errorDeleteOrder } = await awesome.async(() => deleteOrder({ table_id }));
	if (errorDeleteOrder) return Response.json(error, { status: 400 });

	// const { } = await awesome(() => updateCustomer())

	return Response.json(data);
};
