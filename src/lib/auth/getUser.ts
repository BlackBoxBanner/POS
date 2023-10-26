import { supabase } from '$lib/supabase';
import { customDebug, customError } from '$lib/utils/errorHandler';
import type { GetUser } from '$lib/types/auth';

export const getUser: GetUser = async ({ id, debug }) => {
	customDebug('Checking ID', debug);
	const employee = id
		? supabase.from('employees').select('*').eq('id', id)
		: supabase.from('employees').select('*');

	customDebug('Getting data', debug);
	let { data, error } = await employee;

	customDebug('Checking error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	return data;
};
