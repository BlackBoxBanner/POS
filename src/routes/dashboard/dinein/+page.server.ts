import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const { data: tables, error: tablesError } = await supabase.from('tables').select('*');
	if (tablesError) throw error(400, tablesError);

	const { data: customers, error: customersError } = await supabase.from('customers').select('*');
	if (customersError) throw error(400, customersError);

	return { tables, customers };
}) satisfies PageServerLoad;
