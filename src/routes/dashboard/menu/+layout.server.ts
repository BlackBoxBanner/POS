import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
	const { data, error: dishError } = await supabase.from('dish_types').select('*');
	if (dishError) throw error(400, dishError);

	const { data: menus, error: menusError } = await supabase.from('menus').select('*');
	if (menusError) throw error(400, menusError);
	return { dishType: data, menus };
}) satisfies LayoutServerLoad;
