import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabase';

export const load = (async () => {
	const {
		data: { session },
		error
	} = await supabase.auth.getSession();

	const { data: dishType, error: dishError } = await supabase.from('dish_types').select('*');
	if (error) throw new Error(error.message);
	if (dishError) throw new Error(dishError.message);
	const dishTypeArr = dishType.reduce((result, next) => {
		result.push(next.name);
		return result;
	}, [] as string[]);
	return { session, dishTypeArr };
}) satisfies PageServerLoad;
