import { signIn } from '$lib/auth';
import type { SignIn, SignInProps } from '$lib/types/auth';
import { awesome } from '@dookdiks/utils';
import type { RequestHandler } from '@sveltejs/kit';

/**
 * Handles the POST request for user sign-in.
 *
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as SignInProps;
	const { data, error } = await awesome.async(() => signIn(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};
