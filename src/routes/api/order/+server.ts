import {
	createOrder,
	deleteOrder,
	type CreateOrderProps,
	type DeleteOrderProps,
	getOrders,
	type GetOrdersProps,
	type UpdateOrderProps,
	updateOrder
} from '$lib/handler/order';
import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from './$types';

const exampleFunc = async () => {
	return 'example function toggle';
};

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetOrdersProps['id'];
	const table_id = params.get('id') as GetOrdersProps['table_id'];

	const { data, error } = await awesome(() => getOrders({ id, table_id }));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as Omit<CreateOrderProps, 'price'>;

	const { data, error } = await awesome(() => createOrder(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateOrderProps;

	const { data, error } = await awesome(() => updateOrder(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteOrderProps;
	const { data, error } = await awesome(() => deleteOrder(body));
	if (error) Response.json(error, { status: 400 });
	return Response.json(data);
};
