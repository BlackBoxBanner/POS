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
import { awesome } from '$lib/utils/awesome';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetTableProps['id'];

	const { data, error } = await awesome(() => getTable({ id }))
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data)
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateTableProps;

	const { data, error } = await awesome(() => createTable(body))
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data)
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateTableProps;
	const { data, error } = await awesome(() => updateTable(body))
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data)
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteTableProps;
	const { data, error } = await awesome(() => deleteTable(body))
	if (error) return Response.json(error, { status: 400 });
	return Response.json(data)
};
