import { supabase } from '$lib/supabase';
import type { SignOut } from '$lib/types/auth';
import { customDebug, customError } from '@dookdiks/error';

export const signOut: SignOut = async ({ debug }) => {
	customDebug('Starting signout', debug);
	const { error } = await supabase.auth.signOut();
	if (error) throw customError({ id: 'signout', message: error.message });
	return 'Success';
};
