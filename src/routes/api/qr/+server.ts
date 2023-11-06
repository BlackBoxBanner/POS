import type { RequestHandler } from './$types';
import QRCode from 'qrcode';

export const GET: RequestHandler = async ({ url }) => {
	const params = url.searchParams;
	const urlString = params.get('url');
	const type = params.get('type');

	if (!urlString) return Response.json('No url provided', { status: 400 });

	try {
		if (type == 'string') {
			return Response.json(await QRCode.toString(urlString));
		} else {
			return Response.json(await QRCode.toDataURL(urlString));
		}
	} catch (error: unknown) {
		if (error instanceof Error) return Response.json(error.message, { status: 400 });
		return Response.json(error, { status: 400 });
	}
};
