import { supabase } from '$lib/supabase';
import type { Inserts, Tables } from '$lib/types/schema';
import { customError } from '$lib/utils/errorHandler';
import { getMenu } from '../menu';

type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;

export type CreateOrderProps = Pick<Inserts<'orders'>, 'table_id' | 'menu' | 'portion'>;

export const createOrder: Orders<CreateOrderProps> = async (props) => {
	const { menus } = await getMenu({});
	if (!props.menu)
		throw customError({
			id: 'menus',
			message: 'No menu from input.'
		});

	const notInMenu = !menus.includes(props.menu);

	if (notInMenu)
		throw customError({
			id: 'menus',
			message: `No menu name ${props.menu} in database`
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
