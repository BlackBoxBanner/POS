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

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetTableProps['id'];

	const { data, error } = await awesome.async(() => getTable({ id }));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateTableProps;

	const { data, error } = await awesome.async(() => createTable(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateTableProps;
	const { data, error } = await awesome.async(() => updateTable(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteTableProps;
	const { data, error } = await awesome.async(() => deleteTable(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
