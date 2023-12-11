import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';

/**
 * Loads tables and customers data from the database.
 * @returns {Promise<{ tables: any[], customers: any[] }>} The loaded tables and customers data.
 * @throws {Error} If there is an error loading the data from the database.
 */
export const load = (async () => {
	const { data: tables, error: tablesError } = await supabase.from('tables').select('*');
	if (tablesError) throw error(400, tablesError);

	const { data: customers, error: customersError } = await supabase.from('customers').select('*');
	if (customersError) throw error(400, customersError);

	return { tables, customers };
}) satisfies PageServerLoad;
