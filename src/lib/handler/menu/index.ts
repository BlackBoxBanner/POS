import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';

export type CreateMenuProps = Inserts<'menus'>;
type CreateMenu = (props: CreateMenuProps) => Promise<Tables<'menus'>>;
export const createMenu: CreateMenu = async ({ name, price, ...rest }) => {
	if (!name || name === undefined) throw new Error('Name number not provided');
	if (!price || price === undefined) throw new Error('Price not provided');
	const { data, error } = await supabase
		.from('menus')
		.insert({
			name,
			price,
			...rest
		})
		.select();

	if (error) throw new Error(error.message);
	return data[0];
};

export type GetMenuProps = {
	id?: string;
};
type GetMenu = (props: GetMenuProps) => Promise<Inserts<'menus'>[]>;
export const getMenu: GetMenu = async ({ id }) => {
	if (id) {
		const { data, error } = await supabase.from('menus').select().eq('id', id);
		if (error) throw new Error(error.message);
		return data;
	} else {
		const { data, error } = await supabase.from('menus').select('*');
		if (error) throw new Error(error.message);
		return data;
	}
};

export type DeleteMenuProps = {
	id: string;
};
type DeleteMenu = (props: DeleteMenuProps) => Promise<Tables<'menus'>>;
export const deleteMenu: DeleteMenu = async ({ id }) => {
	if (!id || id === undefined) throw new Error('ID not provided');
	const { error, data } = await supabase.from('menus').delete().eq('id', id).select();
	if (error) throw new Error(error.message);
	return data[0];
};

export type UpdateMenuProps = Updates<'menus'> & {
	id: string;
};
type UpdateMenu = (props: UpdateMenuProps) => Promise<Tables<'menus'>>;
export const updateMenu: UpdateMenu = async ({ id, ...props }) => {
	if (!id) throw new Error('No id provided');
	const { data, error } = await supabase.from('menus').update(props).eq('id', id).select();
	if (error) throw new Error(error.message);
	return data[0];
};
