import { getCustomer, type GetCustomerProps } from '$lib/handler/customer';
import { updateCustomer, type UpdateCustomerProps } from '$lib/handler/customer';
import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from './$types';

const exampleFunc = async () => {
	return 'example function toggle';
};

export const GET: RequestHandler = async ({ url }) => {
	const searchParams = url.searchParams;
	let params: GetCustomerProps = {
		id: searchParams.get('id') as string
	};

	const { data, error } = await awesome(() => getCustomer(params));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const { } = (await request.json()) as {};

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateCustomerProps

	const { data, error } = await awesome(() => updateCustomer(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { } = (await request.json()) as {};

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};
