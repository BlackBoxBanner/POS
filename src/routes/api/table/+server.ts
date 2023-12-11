import {
	type GetTableProps,
	type CreateTableProps,
	type DeleteTableProps,
	type UpdateTableProps,
	createTable,
	getTable,
	deleteTable,
	updateTable
} from '$lib/handler/table';
import { awesome } from '@dookdiks/utils';
import type { RequestHandler } from './$types';

/**
 * Handles the GET request for retrieving a table.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetTableProps['id'];

	const { data, error } = await awesome.async(() => getTable({ id }));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the POST request for creating a table.
 * 
 * @param request - The request object.
 * @returns The response object with the created table data or an error message.
 */
export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateTableProps;

	const { data, error } = await awesome.async(() => createTable(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the PATCH request for updating a table.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateTableProps;
	const { data, error } = await awesome.async(() => updateTable(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the DELETE request for the table API.
 * @param {Request} request - The request object.
 * @returns {Response} The response object.
 */
export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteTableProps;
	const { data, error } = await awesome.async(() => deleteTable(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
