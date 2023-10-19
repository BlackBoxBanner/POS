import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as string;

	try {
		return new Response();
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response(JSON.stringify(error), { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const {} = (await request.json()) as {};
	try {
		return new Response();
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response(JSON.stringify(error), { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
	const {} = (await request.json()) as {};
	try {
		return new Response();
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response(JSON.stringify(error), { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const {} = (await request.json()) as {};
	try {
		return new Response();
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response(JSON.stringify(error), { status: 400 });
	}
};
