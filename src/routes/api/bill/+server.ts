import { closeBill, getBill, type closeBillProps } from '$lib/handler/bill/checkout';
import { awesome } from '@dookdiks/utils';
import type { RequestHandler } from './$types';
import { supabase } from '$lib/supabase';

/**
 * Handles the GET request for retrieving bill data.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} A promise that resolves to the response object.
 */
export const GET: RequestHandler = async ({ url }) => {
	const searchParams = url.searchParams;

	let params = {
		customerId: searchParams.get('customerId') as string
	};

	const { data, error } = await awesome.async(() => getBill(params));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the POST request to close a bill.
 * 
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as closeBillProps;

	const { data, error } = await awesome.async(() => closeBill(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
