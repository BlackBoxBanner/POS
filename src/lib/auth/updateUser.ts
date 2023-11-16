import { supabase } from '$lib/supabase';
import { customDebug, customError } from '@dookdiks/error';
import type { UpdateUser } from '$lib/types/auth';

export const updateUser: UpdateUser = async ({ name, debug }) => {
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
		.eq('id', session?.user.id)
		.select();

	if (databaseError) throw customError({ id: 'name', message: databaseError.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};
