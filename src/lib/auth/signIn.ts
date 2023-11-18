import { supabase } from '$lib/supabase';
import type { SignIn } from '$lib/types/auth';
import { customDebug, customError } from '@dookdiks/error';

export const signIn: SignIn = async ({ email, password, debug }) => {
	customDebug('Checking undefine email', debug);
	if (!email || email === undefined)
		throw customError({
			id: 'email',
			message: 'No email provided'
		});

	customDebug('Checking undefine password', debug);
	if (!password || password === undefined)
		throw customError({
			id: 'password',
			message: 'No password provided'
		});

	customDebug('Signing in using password', debug);
	const { data, error } = await supabase.auth.signInWithPassword({
		email,
		password
	});
	customDebug('Checking for error', debug);
	if (error)
		throw customError({
			id: 'password',
			message: error.message
		});
	return data;
};
