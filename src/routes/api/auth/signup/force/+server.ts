import type { RequestHandler } from './$types';
import { signUpForce, type SignUpProps } from '$lib/auth';
export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as SignUpProps;

	console.log('api run');
	try {
		return new Response(JSON.stringify(await signUpForce(body)));
	} catch (err: unknown) {
		if (err instanceof Error) return new Response(err.message, { status: 400 });
		return new Response('Error', { status: 400 });
	}
};
