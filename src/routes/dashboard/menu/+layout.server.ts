import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { LayoutServerLoad } from './$types';

/**
 * Loads dish types and menus from the database.
 * @returns {Promise<{ dishType: any[], menus: any[] }>} The loaded dish types and menus.
 * @throws {Error} If there is an error loading dish types or menus.
 */
export const load = (async () => {
	const { data, error: dishError } = await supabase.from('dish_types').select('*');
	if (dishError) throw error(400, dishError);

	const { data: menus, error: menusError } = await supabase.from('menus').select('*');
	if (menusError) throw error(400, menusError);
	return { dishType: data, menus };
}) satisfies LayoutServerLoad;
