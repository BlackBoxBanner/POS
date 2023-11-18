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

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetMenuProps['id'];

	const { data, error } = await awesome.async(() => getMenu({ id }));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateMenuProps;

	const { data, error } = await awesome.async(() => createMenu(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateMenuProps;

	const { data, error } = await awesome.async(() => updateMenu(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteMenuProps;

	const { data, error } = await awesome.async(() => deleteMenu(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
