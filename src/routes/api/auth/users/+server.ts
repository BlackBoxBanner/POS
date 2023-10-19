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
		return new Response(JSON.stringify(await getUser({ id })));
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response('Error', { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { id } = (await request.json()) as DeleteUserProps;
	if (!id || id === undefined) return new Response('No id provided.', { status: 400 });
	try {
		await deleteUser({ id });
		return new Response(`User ${id} has been deleted.`);
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response('Error', { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
	const { name } = (await request.json()) as UpdateUserProps;
	if (!name || name === undefined) return new Response('No name provided.', { status: 400 });
	try {
		return new Response(JSON.stringify(await updateUser({ name })));
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response('Error', { status: 400 });
	}
};
