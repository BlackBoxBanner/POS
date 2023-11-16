import { supabase } from '$lib/supabase';
import type { GetUser } from '$lib/types/auth';
import { customDebug, customError } from '@dookdiks/error';

export const getUser: GetUser = async ({ id, email, debug }) => {
	customDebug('Checking ID', debug);
	const employee = id
		? supabase.from('employees').select('*').eq('id', id)
		: email
			? supabase.from('employees').select('*').eq('email', email)
			: supabase.from('employees').select('*');

	customDebug('Getting data', debug);
	let { data, error } = await employee;

	customDebug('Checking error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	return data;
};
