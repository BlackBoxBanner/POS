import { useSession } from '$lib/utils/useSession';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const { session, empolyee } = await useSession();

	return { session, empolyee };
}) satisfies LayoutServerLoad;
