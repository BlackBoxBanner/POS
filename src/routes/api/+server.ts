import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from './$types';

const exampleFunc = async () => {
	return 'example function toggle';
};

export const GET: RequestHandler = async ({ url }) => {
	const searchParams = url.searchParams;
	let params: Record<string, string> = {
		id: searchParams.get('id') as string
	};

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const {} = (await request.json()) as {};

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const {} = (await request.json()) as {};

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const {} = (await request.json()) as {};

	const { data, error } = await awesome(() => exampleFunc());
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
