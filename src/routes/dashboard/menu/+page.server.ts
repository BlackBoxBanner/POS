import { supabase } from '$lib/supabase';
import type { PageServerLoad } from './$types';

export const load = (async () => {
	const { data, error } = await supabase.from('dish_types').select('*');
	if (error) throw new Error(error.message);

	const { data: menus, error: menusError } = await supabase.from('menus').select('*');
	if (menusError) throw new Error(menusError.message);
	return { dishType: data, menus };
}) satisfies PageServerLoad;
