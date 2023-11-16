import { closeBill, type closeBillProps } from '$lib/handler/bill/checkout';
import { awesome } from '@dookdiks/utils';
import type { RequestHandler } from './$types';

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as closeBillProps;

	const { data, error } = await awesome.async(() => closeBill(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
