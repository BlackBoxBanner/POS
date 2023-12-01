import { useSession } from '$lib/utils/useSession';
import type { Handle } from '@sveltejs/kit';

export const handle: Handle = async ({ event, resolve }) => {
	const { session } = await useSession();

	if (event.url.pathname.startsWith('/dashboard') && !session) {
		return new Response('Redirect', { status: 303, headers: { Location: '/' } });
	}

	if ((event.url.pathname == '/' || event.url.pathname.startsWith('/auth')) && session) {
		return new Response('Redirect', { status: 303, headers: { Location: '/dashboard' } });
	}

	const response = await resolve(event);
	return response;
};
