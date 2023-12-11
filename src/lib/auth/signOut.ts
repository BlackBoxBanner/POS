/**
 * Signs out the user.
 *
 * @param {Object} options - The options for signing out.
 * @param {boolean} options.debug - Whether to enable debug mode.
 * @returns {Promise<string>} A promise that resolves to 'Success' if the sign out is successful.
 * @throws {Error} If there is an error during sign out.
 */
import { supabase } from '$lib/supabase';
import type { SignOut } from '$lib/types/auth';
import { customDebug, customError } from '@dookdiks/error';

export const signOut: SignOut = async ({ debug }) => {
	customDebug('Starting signout', debug);
	const { error } = await supabase.auth.signOut();
	if (error) throw customError({ id: 'signout', message: error.message });
	return 'Success';
};
