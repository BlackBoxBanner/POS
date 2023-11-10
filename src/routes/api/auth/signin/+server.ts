import { signIn } from '$lib/auth';
import type { SignIn, SignInProps } from '$lib/types/auth';
import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from '@sveltejs/kit';

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as SignInProps;
	const { data, error } = await awesome(() => signIn(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
