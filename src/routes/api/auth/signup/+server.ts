import { signUp } from '$lib/auth';
import type { SignUpProps } from '$lib/types/auth';
import type { RequestHandler } from '@sveltejs/kit';
import { awesome } from '@dookdiks/utils';

/**
 * Handles the POST request for user signup.
 *
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as SignUpProps;

	const { data, error } = await awesome.async(() => signUp(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};
