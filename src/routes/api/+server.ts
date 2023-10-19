import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as string;

	try {
		return Response.json("");
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const { } = (await request.json()) as {};
	try {
		return Response.json("");
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
	const { } = (await request.json()) as {};
	try {
		return Response.json("");
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const { } = (await request.json()) as {};
	try {
		return Response.json("");
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};
