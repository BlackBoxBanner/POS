import type { Inserts , Tables , Updates } from "$lib/types/schema";
import { customError } from "$lib/utils/errorHandler";
import { supabase } from '$lib/supabase';

type Customers<T, V = Tables<'customers'>> = (props: T) => Promise<V>;

export type CreateCustomerProps = Pick<Inserts<'customers'>, 'table_id'|'employee_id'|'branch_id'>;

export const createCustomer: Customers<CreateCustomerProps> = async ({table_id,employee_id,branch_id}) => {
    //customDebug('Checking Customer', debug);
    if(!table_id || table_id === undefined)
        throw customError({id: 'table_id', message: 'Table ID not provided'});
    if(!employee_id || employee_id === undefined)
        throw customError({id: 'employee_id', message: 'No employee assigned to customer'});
    if(branch_id || branch_id === undefined)
        throw customError({id: 'branch_id', message: 'No branch assigned to customer'});
    
    const { data, error } = await supabase
		.from('customer')
		.insert({
			table_id,
			employee_id,
            branch_id
        })
		.select();
    
    if (error) throw customError({ id: 'customer_id', message: error.message });
    if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
    return data[0];
};

export type GetCustomerProps = {
	id?: string;
};

export const getCustomer: Customers<GetCustomerProps, Tables<'orders'>[]> = async ({ id }) => {
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

export const updateCustomer: Customers<UpdateCustomerProps> = async ({ id, ...props }) => {
  const { data, error } = await supabase.from("customers").update(props).eq("id", id).select()

  if (error) throw customError({
    id: "id",
    message: error.message
  })

  return data[0]
}

