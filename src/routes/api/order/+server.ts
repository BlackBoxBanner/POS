import { type DeleteOrderProps, deleteOrder } from '$lib/handler/order';
import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from './$types';

const exampleFunc = async () => {
	return 'example function toggle';
};

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as string;

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as {}

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const { } = (await request.json()) as {};

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteOrderProps;
	const { data, error } = await awesome(() => deleteOrder(body))
	if (error) Response.json(error, { status: 400 });
	return Response.json(data);
};