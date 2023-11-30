import type { PageServerLoad } from './$types';
import { supabase } from '$lib/supabase';
import { useSession } from '$lib/utils/useSession';

export const load = (async () => {
	const { empolyee, session } = await useSession()

	const { data: dishType, error: dishError } = await supabase.from('dish_types').select('*');
	if (dishError) throw new Error(dishError.message);
	const dishTypeArr = dishType.reduce((result, next) => {
		result.push(next.name);
		return result;
	}, [] as string[]);
	return { session, dishTypeArr, empolyee };
}) satisfies PageServerLoad;
