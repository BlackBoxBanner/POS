import type { RequestHandler } from './$types';
import { signOut } from '$lib/auth';

export const DELETE: RequestHandler = async ({ request }) => {
	try {
		return Response.json(await signOut());
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};
