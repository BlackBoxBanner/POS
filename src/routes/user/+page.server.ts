import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const { data: employees, error } = await supabase.from('employees').select('*');
	if (error) throw new Error(error.message);
	return { employees };
}) satisfies PageServerLoad;
