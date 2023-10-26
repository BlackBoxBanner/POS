import { supabase } from '$lib/supabase';
import { customDebug, customError } from '$lib/utils/errorHandler';
import type { SignOut } from '$lib/types/auth';

export const signOut: SignOut = async ({ debug }) => {
	customDebug('Starting signout', debug);
	const { error } = await supabase.auth.signOut();
	if (error) throw customError({ id: 'signout', message: error.message });
	return 'Success';
};
