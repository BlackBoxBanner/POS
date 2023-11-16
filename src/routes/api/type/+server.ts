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

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as string;

	const { data, error } = await awesome.async(() => getDishType({ id }));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateTypeProps;

	const { data, error } = await awesome.async(() => createDishType(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateTypeProps;

	const { data, error } = await awesome.async(() => updateDishType(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteTypeProps;

	const { data, error } = await awesome.async(() => deleteDishType(body));
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data);
};
