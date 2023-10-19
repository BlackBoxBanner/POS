import type { RequestHandler } from './$types';
import { signIn, type SignInProps } from '$lib/auth';

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as SignInProps;

	try {
		return Response.json(await signIn(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};
