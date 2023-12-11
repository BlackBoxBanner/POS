import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customDebug, customError } from '@dookdiks/error';

export type CreateMenuProps = Inserts<'menus'> & { debug?: boolean };
type CreateMenu = (props: CreateMenuProps) => Promise<Tables<'menus'>>;
/**
 * Creates a menu item.
 * @param {Object} options - The options for creating a menu item.
 * @param {string} options.name - The name of the menu item.
 * @param {number} options.price - The price of the menu item.
 * @param {boolean} options.debug - Whether to enable debug mode.
 * @param {Object} options.rest - Additional properties for the menu item.
 * @returns {Promise<Object>} The created menu item.
 * @throws {Error} If the name or price is not provided.
 * @throws {Error} If there is an error during the creation process.
 */
export const createMenu: CreateMenu = async ({ name, price, debug, ...rest }) => {
	customDebug('Checking name', debug);
	if (!name || name === undefined)
		throw customError({ id: 'name', message: 'Name number not provided' });

	customDebug('Checking price', debug);
	if (!price || price === undefined)
		throw customError({ id: 'price', message: 'Price not provided' });

	customDebug('Run create data', debug);
	const { data, error } = await supabase
		.from('menus')
		.insert({
			name,
			price,
			...rest
		})
		.select();

	customDebug('Checking error', debug);
	if (error) throw customError({ id: 'name', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};

export type GetMenuProps = {
	id?: string;
	debug?: boolean;
};
type GetMenu = (props: GetMenuProps) => Promise<{ data: Inserts<'menus'>[]; menus: string[] }>;
/**
 * Retrieves the menu data from the database.
 * 
 * @param {Object} options - The options for retrieving the menu.
 * @param {string} options.id - The ID of the menu to retrieve (optional).
 * @param {boolean} options.debug - Flag indicating whether to enable debug mode (optional).
 * @returns {Promise<{ data: any[], menus: string[] }>} The menu data and an array of menu names.
 * @throws {Error} If there is an error retrieving the menu data.
 */
export const getMenu: GetMenu = async ({ id, debug }) => {
	customDebug('', debug);
	const func = id
		? supabase.from('menus').select().eq('id', id)
		: supabase.from('menus').select('*');

	customDebug('', debug);
	const { data, error } = await func;

	customDebug('', debug);
	if (error) throw customError({ id: 'error', message: error.message });

	const menus = data.reduce((result, next) => {
		result.push(next.name);
		return result;
	}, [] as string[]);

	return { data, menus };
};

export type DeleteMenuProps = {
	id: string;
	debug?: boolean;
};
type DeleteMenu = (props: DeleteMenuProps) => Promise<Tables<'menus'>>;
/**
 * Deletes a menu item by ID.
 * @param {Object} options - The options object.
 * @param {string} options.id - The ID of the menu item to delete.
 * @param {boolean} options.debug - Whether to enable debug mode.
 * @returns {Promise<Object>} The deleted menu item.
 * @throws {Error} If the ID is not provided.
 * @throws {Error} If there is an error during the deletion process.
 * @throws {Error} If no menu item with the provided ID is found.
 */
export const deleteMenu: DeleteMenu = async ({ id, debug }) => {
	customDebug('Checking ID', debug);
	if (!id || id === undefined) throw customError({ id: 'id', message: 'ID not provided' });

	customDebug('Run select menu', debug);
	const { error, data } = await supabase.from('menus').delete().eq('id', id).select();

	customDebug('Check error', debug);

	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};

export type UpdateMenuProps = Updates<'menus'> & {
	id: string;
	debug?: boolean;
};
type UpdateMenu = (props: UpdateMenuProps) => Promise<Tables<'menus'>>;
/**
 * Updates a menu item in the database.
 * @param {Object} options - The options for updating the menu item.
 * @param {string} options.id - The ID of the menu item to update.
 * @param {boolean} options.debug - Flag indicating whether to enable debug mode.
 * @param {Object} props - The properties to update in the menu item.
 * @returns {Promise<Object>} - The updated menu item.
 * @throws {Error} - If no ID is provided or if there is an error updating the menu item.
 */
export const updateMenu: UpdateMenu = async ({ id, debug, ...props }) => {
	customDebug('Check ID', debug);
	if (!id) throw customError({ id: 'id', message: 'No id provided' });

	customDebug('Run update database', debug);
	const { data, error } = await supabase.from('menus').update(props).eq('id', id).select();

	customDebug('Check error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};
