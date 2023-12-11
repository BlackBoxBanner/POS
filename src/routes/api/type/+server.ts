import {
	createDishType,
	getDishType,
	type CreateTypeProps,
	type UpdateTypeProps,
	updateDishType,
	type DeleteTypeProps,
	deleteDishType
} from '$lib/handler/type';
import { awesome } from '@dookdiks/utils';
import type { RequestHandler } from './$types';

const exampleFunc = async () => {
	return 'example function toggle';
};

/**
 * Handles the GET request for retrieving a dish type by ID.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as string;

	const { data, error } = await awesome.async(() => getDishType({ id }));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the POST request for creating a new dish type.
 * 
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} A promise that resolves to the response object.
 */
export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateTypeProps;

	const { data, error } = await awesome.async(() => createDishType(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the PATCH request for updating a dish type.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateTypeProps;

	const { data, error } = await awesome.async(() => updateDishType(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the DELETE request for the specified type.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteTypeProps;

	const { data, error } = await awesome.async(() => deleteDishType(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};
