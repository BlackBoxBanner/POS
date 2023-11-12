import { supabase } from '$lib/supabase';
import type { Inserts, Tables } from '$lib/types/schema';
import { customError } from '$lib/utils/errorHandler';
import { updateCustomer } from '../customer';

type HistoryOrders = Tables<'history_order'>;
type History<T, V = HistoryOrders> = (props: T) => Promise<V>;

export type CreateHistoryProps = Pick<Inserts<'history_order'>, 'customer_id' | 'menus'>;

export const createHistory: History<CreateHistoryProps> = async ({ menus, customer_id }) => {
	if (!menus || menus.length == 0)
		throw customError({
			id: 'menus',
			message: 'No menus provided'
		});
	if (!customer_id)
		throw customError({
			id: 'customer_id',
			message: 'no customer_id provided'
		});

	const { data, error } = await supabase
		.from('history_order')
		.insert({ menus, customer_id })
		.select();

	if (error)
		throw customError({
			id: 'history_order',
			message: error.message
		});

	return data[0];
};

export type GetHistoryOrder = {
	id?: string;
};
export const getHistory: History<GetHistoryOrder, HistoryOrders[]> = async ({ id }) => {
	let query = supabase.from('history_order').select('*');

	if (id) {
		query = query.eq('id', id);
	}
	const { data, error } = await query;

	if (error) {
		if (id) {
			throw customError({
				id: 'id',
				message: `Error fetching order by id: ${error.message}`
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

export type closeBillProps = {
	id: string,
}

export const closeBill = async ({ id }: closeBillProps) => {
	const date = new Date()
	return await updateCustomer({ id, check_out_at: date.toISOString() })

}
