import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customError } from '@dookdiks/error';

type Customers<T, V = Tables<'customers'>> = (props: T) => Promise<V>;

type GetId = (props: GetIdProps) => Promise<string | undefined>;

export type GetIdProps = {
	table_id: string;
};
/**
 * Retrieves the ID of a customer based on the provided table ID.
 * @param {Object} options - The options for retrieving the customer ID.
 * @param {string} options.table_id - The ID of the table.
 * @returns {Promise<string>} - The ID of the customer.
 * @throws {CustomError} - If there is an error retrieving the customer ID.
 */
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

/**
 * Creates a new customer.
 *
 * @param {CreateCustomerProps} params - The parameters for creating a customer.
 * @param {string} params.table_id - The ID of the table.
 * @param {string} params.employee_id - The ID of the employee assigned to the customer.
 * @param {string} params.branch_id - The ID of the branch assigned to the customer.
 * @param {string} params.seat - The seat information for the customer.
 * @returns {Promise<Customer>} - The created customer.
 * @throws {CustomError} - If any of the required parameters are missing or invalid.
 */
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
	if (!branch_id || branch_id === undefined)
		throw customError({ id: 'branch_id', message: 'No branch assigned to customer' });
	if (!seat || seat === undefined)
		throw customError({ id: 'branch_id', message: 'Seat must be projided.' });

	const { data, error } = await supabase
		.from('customers')
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

/**
 * Retrieves customer data from the 'customers' table based on the provided ID.
 * If no ID is provided, retrieves all customer data.
 *
 * @param {GetCustomerProps} props - The properties for retrieving customer data.
 * @returns {Promise<Tables<'customers'>[]>} - A promise that resolves to an array of customer data.
 * @throws {CustomError} - If there is an error fetching the customer data.
 */
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

export type UpdateCustomerProps = Pick<Updates<'customers'>, 'table_id' | 'check_out_at'> & {
	id: string;
};

/**
 * Updates a customer in the database.
 * @param {UpdateCustomerProps} props - The properties of the customer to update.
 * @returns {Promise<Customer>} - The updated customer object.
 * @throws {CustomError} - If there is an error updating the customer.
 */
export const updateCustomer: Customers<UpdateCustomerProps> = async ({ id, ...props }) => {
	const { data, error } = await supabase.from('customers').update(props).eq('id', id).select();

	if (error)
		throw customError({
			id: 'id',
			message: error.message
		});

	return data[0];
};
