import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customError } from '@dookdiks/error';

type Customers<T, V = Tables<'customers'>> = (props: T) => Promise<V>;

type GetId = (props: GetIdProps) => Promise<string | undefined>;

export type GetIdProps = {
	table_id: string;
};
export const getId: GetId = async ({ table_id }) => {
	const { data, error } = await supabase
		.from('customers')
		.select('id')
		.eq('table_id', table_id)
		.is('check_out_at', null);
	if (error)
		throw customError({
			id: 'table_id',
			message: error.message
		});

	return data[0].id;
};

export type CreateCustomerProps = Pick<
	Inserts<'customers'>,
	'table_id' | 'employee_id' | 'branch_id' | 'seat'
>;

export const createCustomer: Customers<CreateCustomerProps> = async ({
	table_id,
	employee_id,
	branch_id,
	seat
}) => {
	//customDebug('Checking Customer', debug);
	if (!table_id || table_id === undefined)
		throw customError({ id: 'table_id', message: 'Table ID not provided' });
	if (!employee_id || employee_id === undefined)
		throw customError({ id: 'employee_id', message: 'No employee assigned to customer' });
	if (branch_id || branch_id === undefined)
		throw customError({ id: 'branch_id', message: 'No branch assigned to customer' });
	if (seat || seat === undefined)
		throw customError({ id: 'branch_id', message: 'Seat must be projided.' });

	const { data, error } = await supabase
		.from('customer')
		.insert({
			table_id,
			employee_id,
			branch_id,
			seat
		})
		.select();

	if (error) throw customError({ id: 'customer_id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};

export type GetCustomerProps = {
	id?: string;
};

export const getCustomer: Customers<GetCustomerProps, Tables<'customers'>[]> = async ({ id }) => {
	let query = supabase.from('customers').select('*');

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

export type UpdateCustomerProps = Pick<
	Updates<'customers'>,
	'table_id' | 'check_out_at' | 'take_away'
> & {
	id: string;
};

export const updateCustomer: Customers<UpdateCustomerProps> = async ({ id, ...props }) => {
	const { data, error } = await supabase.from('customers').update(props).eq('id', id).select();

	if (error)
		throw customError({
			id: 'id',
			message: error.message
		});

	return data[0];
};
