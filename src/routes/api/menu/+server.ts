import {
	type GetMenuProps,
	type CreateMenuProps,
	type DeleteMenuProps,
	type UpdateMenuProps,
	createMenu,
	getMenu,
	deleteMenu,
	updateMenu
} from '$lib/handler/menu';
import type { RequestHandler } from './$types';
import { awesome } from '@dookdiks/utils';

/**
 * Handles the GET request for retrieving a menu item.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetMenuProps['id'];

	const { data, error } = await awesome.async(() => getMenu({ id }));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the POST request for creating a menu.
 *
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} A promise that resolves to the response object.
 */
export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateMenuProps;

	const { data, error } = await awesome.async(() => createMenu(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the PATCH request for updating a menu.
 * @param {Request} request - The request object.
 * @returns {Promise<Response>} - The response object.
 */
export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateMenuProps;

	const { data, error } = await awesome.async(() => updateMenu(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

/**
 * Handles the DELETE request for the menu API.
 * @param {Request} request - The request object.
 * @returns {Response} The response object.
 */
export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteMenuProps;

	const { data, error } = await awesome.async(() => deleteMenu(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
