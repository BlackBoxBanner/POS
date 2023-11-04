import type { RequestHandler } from './$types';
import { signOut } from '$lib/auth';
import { awesome } from '$lib/utils/awesome';

export const POST: RequestHandler = async ({ request }) => {
	const { data, error } = await awesome(() => signOut({}))
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data)
};
