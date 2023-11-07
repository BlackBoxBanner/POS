import { getHistory, type GetHistoryOrder } from '$lib/handler/bill/checkout';
import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from './$types';

const exampleFunc = async () => {
	return 'example function toggle';
};

export const GET: RequestHandler = async ({ url }) => {
	const searchParams = url.searchParams;
	let params: GetHistoryOrder = {
		id: searchParams.get('id') as GetHistoryOrder["id"]
	};

	const { data, error } = await awesome(() => getHistory(params));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const { } = (await request.json()) as {};

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};
