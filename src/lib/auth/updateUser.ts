import { supabase } from '$lib/supabase';
import { customDebug, customError } from '@dookdiks/error';
import type { UpdateUser } from '$lib/types/auth';

/**
 * Updates the user's information in the database.
 * @param {Object} options - The options for updating the user.
 * @param {string} options.name - The new name for the user.
 * @param {boolean} options.debug - Whether to enable debug mode.
 * @param {string} options.email - The email of the user.
 * @returns {Promise<Object>} The updated user object.
 * @throws {Error} If no name is provided.
 * @throws {Error} If there is an error getting the session.
 * @throws {Error} If the user is not signed in.
 * @throws {Error} If there is an error updating the database.
 * @throws {Error} If no matching ID or email is found.
 */
export const updateUser: UpdateUser = async ({ name, debug, email }) => {
	customDebug('Checking name', debug);
	if (!name || name === undefined) throw customError({ id: 'name', message: 'No name provided' });

	customDebug('getting session', debug);
	const {
		data: { session },
		error: sessionError
	} = await supabase.auth.getSession();

	customDebug('checking session error', debug);
	if (sessionError) throw customError({ id: 'name', message: sessionError.message });
	customDebug('checking session', debug);
	if (!session) throw customError({ id: 'name', message: 'User have not signin' });

	customDebug('updating database', debug);

	const { data, error: databaseError } = await supabase
		.from('employees')
		.update({
			name: name
		})
		.eq(email ? 'email' : 'id', email ? email : session?.user.id)
		.select();

	if (databaseError) throw customError({ id: 'name', message: databaseError.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID or Email' });
	return data[0];
};
