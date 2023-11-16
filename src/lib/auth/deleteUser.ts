import { supabase, supabaseAdmin } from '$lib/supabase';
import type { DeleteUser } from '$lib/types/auth';
import { customDebug, customError } from '@dookdiks/error';

export const deleteUser: DeleteUser = async ({ id, debug }) => {
	customDebug('Starting check id', debug);
	if (!id || id === undefined) throw customError({ id: 'id', message: 'No id provided.' });
	customDebug('Deleting user', debug);
	const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(id);

	customDebug('Checking delete error', debug);
	if (authError) throw customError({ id: 'id', message: authError.message });
	customDebug('Updating database', debug);
	const { data, error: databaseError } = await supabase
		.from('employees')
		.delete()
		.eq('id', id)
		.select();

	customDebug('Checking error', debug);
	if (databaseError) throw customError({ id: 'id', message: databaseError.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};
