import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';

export type CreateTableProps = Inserts<'tables'>;
type CreateTable = (props: CreateTableProps) => Promise<Tables<'tables'>>;
export const createTable: CreateTable = async ({ table_number, seat, ...rest }) => {
	if (!table_number || table_number === undefined) throw new Error('table number not provided');
	if (!seat || seat === undefined) throw new Error('Seat not provided');
	const { data, error } = await supabase
		.from('tables')
		.insert({
			table_number,
			seat,
			...rest
		})
		.select();

	if (error) throw new Error(error.message);
	return data[0];
};

export type GetTableProps = {
	id?: string;
};
type GetTable = (props: GetTableProps) => Promise<Inserts<'tables'>[]>;
export const getTable: GetTable = async ({ id }) => {
	if (id) {
		const { data, error } = await supabase.from('tables').select().eq('id', id);
		if (error) throw new Error(error.message);
		return data;
	} else {
		const { data, error } = await supabase.from('tables').select('*');
		if (error) throw new Error(error.message);
		return data;
	}
};

export type DeleteTableProps = {
	id: string;
};
type DeleteTable = (props: DeleteTableProps) => Promise<Tables<'tables'>>;
export const deleteTable: DeleteTable = async ({ id }) => {
	if (!id || id === undefined) throw new Error('ID not provided');
	const { error, data } = await supabase.from('tables').delete().eq('id', id).select();
	if (error) throw new Error(error.message);
	return data[0];
};

export type UpdateTableProps = Updates<'tables'> & {
	id: string;
};
type UpdateTable = (props: UpdateTableProps) => Promise<Tables<'tables'>>;
export const updateTable: UpdateTable = async ({ id, ...props }) => {
	if (!id) throw new Error('No id provided');
	const { data, error } = await supabase.from('tables').update(props).eq('id', id).select();
	if (error) throw new Error(error.message);
	return data[0];
};
