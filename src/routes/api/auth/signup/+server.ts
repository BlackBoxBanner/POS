import type { RequestHandler } from './$types';
import { signUp, type SignUpProps } from '$lib/auth';
export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as SignUpProps;

	try {
		return Response.json(await signUp(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};
