import { getUser, deleteUser, updateUser } from '$lib/auth';
import type { DeleteUserProps, UpdateUserProps } from '$lib/types/auth';
import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id');

	const { data, error } = await awesome(() => getUser({ id }))
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data)
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteUserProps;
	if (!body.id || body.id === undefined) return Response.json('No id provided.', { status: 400 });

	const { data, error } = await awesome(() => deleteUser(body))
	
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data)
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateUserProps;
	if (!body.name || body.name === undefined)
		return new Response('No name provided.', { status: 400 });

	const { data, error } = await awesome(() => updateUser(body))
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data)
};
