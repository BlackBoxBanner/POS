import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabase';
import { signUp } from '$lib/auth';

export const load = (async () => {
	const client = await supabase.from('employees').select('*');

	return { client };
}) satisfies PageServerLoad;
