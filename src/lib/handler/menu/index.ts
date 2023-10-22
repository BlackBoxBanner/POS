import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customError, customDebug } from '$lib/utils/errorHandler';

export type CreateMenuProps = Inserts<'menus'> & { debug?: boolean };
type CreateMenu = (props: CreateMenuProps) => Promise<Tables<'menus'>>;
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
	return data[0];
};

export type GetMenuProps = {
	id?: string;
	debug?: boolean;
};
type GetMenu = (props: GetMenuProps) => Promise<Inserts<'menus'>[]>;
export const getMenu: GetMenu = async ({ id, debug }) => {
	customDebug('', debug);
	const func = id
		? supabase.from('menus').select().eq('id', id)
		: supabase.from('menus').select('*');

	customDebug('', debug);
	const { data, error } = await func;

	customDebug('', debug);
	if (error) throw customError({ id: 'error', message: error.message });
	return data;
};

export type DeleteMenuProps = {
	id: string;
	debug?: boolean;
};
type DeleteMenu = (props: DeleteMenuProps) => Promise<Tables<'menus'>>;
export const deleteMenu: DeleteMenu = async ({ id, debug }) => {
	customDebug('Checking ID', debug);
	if (!id || id === undefined) throw customError({ id: 'id', message: 'ID not provided' });

	customDebug('Run select menu', debug);
	const { error, data } = await supabase.from('menus').delete().eq('id', id).select();

	customDebug('Check error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	return data[0];
};

export type UpdateMenuProps = Updates<'menus'> & {
	id: string;
	debug?: boolean;
};
type UpdateMenu = (props: UpdateMenuProps) => Promise<Tables<'menus'>>;
export const updateMenu: UpdateMenu = async ({ id, debug, ...props }) => {
	customDebug('Check ID', debug);
	if (!id) throw customError({ id: 'id', message: 'No id provided' });

	customDebug('Run update database', debug);
	const { data, error } = await supabase.from('menus').update(props).eq('id', id).select();

	customDebug('Check error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	return data[0];
};
