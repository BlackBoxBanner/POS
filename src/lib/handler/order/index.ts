import { supabase } from '$lib/supabase';
import type { Inserts, Tables } from '$lib/types/schema';
import { customError } from '$lib/utils/errorHandler';
import { getMenu } from '../menu';

type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;

export type CreateOrderProps = {
	table_id: string;
	menus: string[];
};

export const createOrder: Orders<CreateOrderProps> = async (props) => {
	const { menus } = await getMenu({});
	if (!props.menus)
		throw customError({
			id: 'menus',
			message: 'No menu from input.'
		});

	const notInMenu = props.menus.filter((menu) => !menus.includes(menu));

	if (notInMenu.length)
		throw customError({
			id: 'menus',
			message: `No menu(s) name ${notInMenu} in database`
		});

	const { data, error } = await supabase.from('orders').insert(props).select();
	if (error)
		throw customError({
			id: 'Create Order',
			message: error.message
		});
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};

export const getOrder = async () => {
	return;
};
