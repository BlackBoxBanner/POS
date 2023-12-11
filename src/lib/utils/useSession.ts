import { supabase } from '$lib/supabase';
/**
 * Retrieves the session and employee information.
 * @returns {Promise<{ session: any, employee: any }>} The session and employee information.
 * @throws {Error} If there is an error retrieving the session or employee information.
 */
export const useSession = async () => {
	const {
		data: { session },
		error
	} = await supabase.auth.getSession();

	if (error) throw new Error(error.message);
	if (!session) return { session, empolyee: null };

	const uid = session.user.id;

	const { data: empolyee, error: empError } = await supabase
		.from('employees')
		.select('*')
		.eq('id', uid);
	if (empError) throw new Error(empError.message);

	return { session, empolyee: empolyee[0] };
};
