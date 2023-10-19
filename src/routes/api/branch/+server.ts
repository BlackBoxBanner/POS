import {
	type CreateBranchProps,
	type DeleteBranchProps,
	type UpdateBranchProps,
	type GetBranchProps,
	getBranch,
	createBranch,
	updateBranch,
	deleteBranch
} from '$lib/handler/branch';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetBranchProps['id'];

	try {
		return new Response(JSON.stringify(await getBranch({ id })));
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response(JSON.stringify(error), { status: 400 });
	}
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateBranchProps;
	try {
		return new Response(JSON.stringify(await createBranch(body)));
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response(JSON.stringify(error), { status: 400 });
	}
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateBranchProps;
	try {
		return new Response(JSON.stringify(await updateBranch(body)));
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response(JSON.stringify(error), { status: 400 });
	}
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteBranchProps;
	try {
		return new Response(JSON.stringify(await deleteBranch(body)));
	} catch (error: unknown) {
		if (error instanceof Error) return new Response(error.message, { status: 400 });
		return new Response(JSON.stringify(error), { status: 400 });
	}
};
