import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const { data: tables, error: tablesError } = await supabase.from('tables').select('*');
	if (tablesError) throw new Error(tablesError.message);

	const { data: customers, error: customersError } = await supabase.from('customers').select('*');
	if (customersError) throw new Error(customersError.message);

	return { tables, customers };
}) satisfies PageServerLoad;
