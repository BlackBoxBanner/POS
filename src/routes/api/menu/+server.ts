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

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetMenuProps['id'];

	try {
		// return new Response(JSON.stringify(await getBranch({ id })));
		return Response.json(await getMenu({ id }));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateMenuProps;
	try {
		return Response.json(await createMenu(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateMenuProps;
	try {
		return Response.json(await updateMenu(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteMenuProps;
	try {
		return Response.json(await deleteMenu(body));
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};
