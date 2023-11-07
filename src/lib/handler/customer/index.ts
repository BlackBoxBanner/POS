import { supabase } from '$lib/supabase';
import type { Tables } from '$lib/types/schema';
import { customError } from '$lib/utils/errorHandler';

type Customer<T, V = Tables<'customers'>> = (props: T) => Promise<V>;

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
