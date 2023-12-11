import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customError } from '@dookdiks/error';
import { getMenu } from '../menu';

type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;

export type CreateOrderProps = Pick<Inserts<'orders'>, 'table_id' | 'menu' | 'portion'>;

/**
 * Creates an order with the given properties.
 * @param {CreateOrderProps} props - The properties for creating the order.
 * @returns {Promise<Order>} - The created order.
 * @throws {CustomError} - If there is an error creating the order.
 */
export const createOrder: Orders<CreateOrderProps> = async (props) => {
	const { menus, data: menuList } = await getMenu({});
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

	const price = menuList.filter((value) => value.name == props.menu)[0].price;

	if (!price || price == undefined)
		throw customError({
			id: 'price',
			message: 'No menu in database.'
		});

	const { data, error } = await supabase
		.from('orders')
		.insert({ ...props, price: price * props.portion })
		.select();
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
/**
 * Retrieves orders based on the provided criteria.
 * @param {GetOrdersProps} props - The criteria to filter the orders.
 * @returns {Promise<Tables<'orders'>[]>} - A promise that resolves to an array of orders.
 * @throws {CustomError} - If there is an error fetching the orders.
 */
export const getOrders: Orders<GetOrdersProps, Tables<'orders'>[]> = async ({ id, table_id }) => {
	let query = supabase.from('orders').select('*');

	if (id) {
		query = query.eq('id', id);
	} else if (table_id) {
		query = query.eq('table_id', table_id!);
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
	id?: string;
	table_id?: string;
};
/**
 * Deletes an order from the database.
 * @param {DeleteOrderProps} options - The options for deleting the order.
 * @param {string} options.id - The ID of the order to delete.
 * @param {string} options.table_id - The ID of the table associated with the order.
 * @returns {Promise<string>} A promise that resolves to a success message when the order is deleted successfully.
 * @throws {CustomError} Throws a custom error if there is an error deleting the order.
 */
export const deleteOrder: Orders<DeleteOrderProps, string> = async ({ id, table_id }) => {
	let query = supabase.from('orders').delete();

	console.log(id);

	if (id) {
		query = query.eq('id', id);
	} else if (table_id) {
		query = query.eq('table_id', table_id);
	}

	const { error } = await query;
	if (error)
		throw customError({
			id: 'database',
			message: error.message
		});
	return 'successfully delete order';
};

export type UpdateOrderProps = Pick<Updates<'orders'>, 'menu' | 'status' | 'id'>;

/**
 * Updates an order in the database.
 *
 * @param {UpdateOrderProps} props - The properties of the order to be updated.
 * @returns {Promise<Order>} - The updated order.
 * @throws {CustomError} - If the ID is missing or if there is an error during the update.
 */
export const updateOrder: Orders<UpdateOrderProps> = async (props) => {
	if (!props.id)
		throw customError({
			id: 'id',
			message: 'ID missing'
		});
	const { data, error } = await supabase.from('orders').update(props).eq('id', props.id).select();

	if (error)
		throw customError({
			id: 'id',
			message: error.message
		});
	return data[0];
};
