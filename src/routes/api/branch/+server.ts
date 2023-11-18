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
import { awesome } from '@dookdiks/utils';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const id = params.get('id') as GetBranchProps['id'];

	const { data, error } = await awesome.async(() => getBranch({ id }));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const POST: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as CreateBranchProps;

	const { data, error } = await awesome.async(() => createBranch(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const PATCH: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as UpdateBranchProps;
	const { data, error } = await awesome.async(() => updateBranch(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};

export const DELETE: RequestHandler = async ({ request }) => {
	const body = (await request.json()) as DeleteBranchProps;

	const { data, error } = await awesome.async(() => deleteBranch(body));
	if (error) return Response.json(error.message, { status: 400 });
	return Response.json(data);
};
