import { supabase } from '$lib/supabase';
import type { Inserts, Tables } from '$lib/types/schema';
import { customError } from '@dookdiks/error';
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
	id: string;
};

export const closeBill = async ({ id }: closeBillProps) => {
	const date = new Date();
	return await updateCustomer({ id, check_out_at: date.toISOString() });
};

type GetBillProps = {
	customerId: string;
};

export type BillReturn = {
	customer: Tables<'customers'>;
	table: Tables<'tables'>;
	branch: Tables<'branches'>;
	employee: Tables<'employees'>;
	order: Tables<'orders'>[];
	menus: Tables<'menus'>[];
};

export const getBill: History<GetBillProps, BillReturn> = async ({ customerId }) => {
	const { data: customers, error: customerError } = await supabase
		.from('customers')
		.select('*')
		.eq('id', customerId);

	if (customerError) throw customError({ id: 'customer', message: customerError.message });
	if (!customers || customers.length == 0)
		throw customError({ id: 'customer', message: 'Customer not found' });

	const { data: menus, error: menusError } = await supabase.from('menus').select('*');

	if (menusError) throw customError({ id: 'menus', message: menusError.message });
	if (!menus || menus.length == 0) throw customError({ id: 'menus', message: 'Menu not found' });

	const customer = customers[0];

	const { data: tableData, error: tableError } = await supabase
		.from('tables')
		.select('*')
		.eq('id', customer.table_id);
	const { data: branchData, error: branchError } = await supabase
		.from('branches')
		.select('*')
		.eq('id', customer.branch_id);
	const { data: employeeData, error: employeeError } = await supabase
		.from('employees')
		.select('*')
		.eq('id', customer.employee_id);
	const { data: orderData, error: orderError } = await supabase
		.from('orders')
		.select('*')
		.eq('table_id', customer.table_id);

	if (tableError) throw customError({ id: 'table', message: tableError.message });
	if (branchError) throw customError({ id: 'branch', message: branchError.message });
	if (employeeError) throw customError({ id: 'employee', message: employeeError.message });
	if (orderError) throw customError({ id: 'order', message: orderError.message });

	if (!tableData || tableData.length == 0)
		throw customError({ id: 'table', message: 'Table not found' });
	if (!branchData || branchData.length == 0)
		throw customError({ id: 'branch', message: 'Branch not found' });
	if (!employeeData || employeeData.length == 0)
		throw customError({ id: 'employee', message: 'Employee not found' });

	return {
		menus,
		customer,
		table: tableData[0],
		branch: branchData[0],
		employee: employeeData[0],
		order: orderData
	};
};
