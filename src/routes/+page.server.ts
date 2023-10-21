import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load = (async () => {
	const {
		data: { session },
		error
	} = await supabase.auth.getSession();
	if (error) throw new Error(error.message);
	return { session };
}) satisfies PageServerLoad;
