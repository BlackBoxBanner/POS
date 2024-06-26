import { supabase, supabaseAdmin } from '$lib/supabase';
import { customDebug, customError } from '@dookdiks/error';
import type { SignUp } from '$lib/types/auth';

/**
 * Sign up a user with the provided email, name, password, and repeat password.
 *
 * @param {Object} options - The options for signing up a user.
 * @param {string} options.email - The email of the user.
 * @param {string} options.name - The name of the user.
 * @param {string} options.password - The password of the user.
 * @param {string} options.repetePassword - The repeated password of the user.
 * @param {boolean} [options.debug=false] - Whether to enable debug mode.
 * @param {boolean} [options.force=false] - Whether to force sign up as an admin user.
 * @returns {Promise<Object>} The user data stored in the database.
 * @throws {Error} If any required parameter is missing or if the passwords do not match.
 */
export const signUp: SignUp = async ({
	email,
	name,
	password,
	repetePassword,
	debug = false,
	force = false
}) => {
	customDebug('Checking email', debug);
	if (!email || email === undefined)
		throw customError({ id: 'email', message: 'No email provided' });

	customDebug('Checking name', debug);
	if (!name || name === undefined) throw customError({ id: 'name', message: 'No name provided' });

	customDebug('Checking password', debug);
	if (!password || password === undefined)
		throw customError({ id: 'password', message: 'No password provided' });

	customDebug('Checking repetePassword', debug);
	if (!repetePassword || repetePassword === undefined)
		throw customError({ id: 'repetePassword', message: 'No repete password provided' });

	customDebug('Checking matched password', debug);
	if (password !== repetePassword)
		throw customError({ id: 'repetePassword', message: 'password not matched' });

	async function register() {
		if (force) {
			return supabaseAdmin.auth.admin.createUser({
				email,
				password,
				email_confirm: true,
				user_metadata: {
					name
				}
			});
		} else {
			return supabase.auth.signUp({
				email,
				password
			});
		}
	}

	customDebug('Register user', debug);
	const { data, error: registerError } = await register();

	customDebug('Checking register error', debug);
	if (registerError) throw customError({ id: 'password', message: registerError.message });

	customDebug('Checking register successful', debug);
	if (!data.user) throw customError({ id: 'email', message: 'No user return' });

	customDebug('Storeing user in database', debug);
	const { data: databaseReturn, error: databaseError } = await supabase
		.from('employees')
		.upsert({
			id: data.user.id,
			email,
			name
		})
		.select();

	customDebug('Checking database error', debug);
	if (databaseError) throw new Error(databaseError.message);
	if (databaseReturn.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return databaseReturn[0];
};
