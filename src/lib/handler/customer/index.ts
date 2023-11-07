import { supabase } from '$lib/supabase';
import type { Tables, Updates } from '$lib/types/schema';
import { customError } from '$lib/utils/errorHandler';

type Customer<T, V = Tables<'customers'>> = (props: T) => Promise<V>;

export type GetCustomerProps = {
	id?: string;
};
export const getCustomer: Customer<GetCustomerProps, Tables<'orders'>[]> = async ({ id }) => {
	let query = supabase.from('orders').select('*');

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

export type UpdateCustomerProps = Pick<Updates<"customers">, "table_id" | "check_out_at" | "take_away"> & {
  id: string
}
export const updateCustomer: Customer<UpdateCustomerProps> = async ({ id, ...props }) => {
  const { data, error } = await supabase.from("customers").update(props).eq("id", id).select()

  if (error) throw customError({
    id: "id",
    message: error.message
  })

  return data[0]
}

