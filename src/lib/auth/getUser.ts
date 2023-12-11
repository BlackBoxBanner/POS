import { supabase } from '$lib/supabase';
import type { GetUser } from '$lib/types/auth';
import { customDebug, customError } from '@dookdiks/error';

/**
 * Retrieves user data based on the provided ID or email.
 * If no ID or email is provided, retrieves all user data.
 *
 * @param {Object} options - The options for retrieving user data.
 * @param {string} options.id - The ID of the user to retrieve.
 * @param {string} options.email - The email of the user to retrieve.
 * @param {boolean} options.debug - Flag indicating whether to enable debug mode.
 * @returns {Promise<Object[]>} - A promise that resolves to an array of user data.
 * @throws {Error} - If there is an error retrieving the user data.
 */
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
