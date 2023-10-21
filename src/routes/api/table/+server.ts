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
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetTableProps['id'];

	try {
		// return new Response(JSON.stringify(await getBranch({ id })));
		return Response.json(await getTable({ id }));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateTableProps;
	try {
		return Response.json(await createTable(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateTableProps;
	try {
		return Response.json(await updateTable(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteTableProps;
	try {
		return Response.json(await deleteTable(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};
