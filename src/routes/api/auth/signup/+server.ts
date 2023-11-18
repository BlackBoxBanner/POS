import { signUp } from '$lib/auth';
import type { SignUpProps } from '$lib/types/auth';
import type { RequestHandler } from '@sveltejs/kit';
import { awesome } from '@dookdiks/utils';

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as SignUpProps;

	const { data, error } = await awesome.async(() => signUp(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
