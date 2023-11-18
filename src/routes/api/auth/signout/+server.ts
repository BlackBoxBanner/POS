import type { RequestHandler } from './$types';
import { signOut } from '$lib/auth';
import { awesome } from '@dookdiks/utils';

export const POST: RequestHandler = async ({ request }) => {
	const { data, error } = await awesome.async(() => signOut({}));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
