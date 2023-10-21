import {
	deleteUser,
	getUser,
	type DeleteUserProps,
	type UpdateUserProps,
	updateUser
} from '$lib/auth';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id');

	try {
		return Response.json(await getUser({ id }));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteUserProps;
	if (!body.id || body.id === undefined) return Response.json('No id provided.', { status: 400 });
	try {
		return Response.json(await deleteUser(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateUserProps;
	if (!body.name || body.name === undefined)
		return new Response('No name provided.', { status: 400 });
	try {
		return Response.json(await updateUser(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};
