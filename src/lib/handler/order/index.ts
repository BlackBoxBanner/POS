import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
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

export type GetOrdersProps = {
	id?: string;
	table_id?: string;
};
export const getOrders: Orders<GetOrdersProps, Tables<'orders'>[]> = async ({ id, table_id }) => {
	let query = supabase.from('orders').select('*');

	if (id) {
		query = query.eq('id', id);
	} else if (table_id) {
		query = query.eq('id', table_id);
	}

	const { data, error } = await query;

	if (error) {
		if (id) {
			throw customError({
				id: 'id',
				message: `Error fetching order by id: ${error.message}`
			});
		} else if (table_id) {
			throw customError({
				id: 'table_id',
				message: `Error fetching order by table_id: ${error.message}`
			});
		} else {
			throw customError({
				id: 'general',
				message: `Error fetching orders: ${error.message}`
			});
		}
	}

	return data;
};

export type DeleteOrderProps = {
	id: string;
};
export const deleteOrder: Orders<DeleteOrderProps, string> = async ({ id }) => {
	if (!id)
		throw customError({
			id: 'id',
			message: 'No ID provided'
		});
	const { error } = await supabase.from('orders').delete().eq('id', id).select('');
	if (error)
		throw customError({
			id: 'database',
			message: error.message
		});
	return 'successfully delete order';
};

export type UpdateOrderProps = Pick<Updates<"orders">, "menu" | "status" | "id">

export const updateOrder: Orders<UpdateOrderProps> = async (props) => {
	if (!props.id) throw customError({
		id: "id",
		message: "ID missing"
	})
	const { data, error } = await supabase.from("orders").update(props).eq("id", props.id).select()

	if (error) throw customError({
		id: "id",
		message: error.message
	})
	return data[0]
}