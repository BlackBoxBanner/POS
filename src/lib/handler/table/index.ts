import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customDebug, customError } from '$lib/utils/errorHandler';

export type CreateTableProps = Inserts<'tables'>;
type CreateTable = (props: CreateTableProps) => Promise<Tables<'tables'>>;
export const createTable: CreateTable = async ({ table_number, seat, ...rest }) => {
	if (!table_number || table_number === undefined)
		throw customError({ id: 'table_number', message: 'table number not provided' });
	if (!seat || seat === undefined) throw customError({ id: 'seat', message: 'Seat not provided' });
	const { data, error } = await supabase
		.from('tables')
		.insert({
			table_number,
			seat,
			...rest
		})
		.select();

	if (error) throw customError({ id: 'table_number', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: "No matched ID" });
	return data[0];
};

export type GetTableProps = {
	id?: string;
	debug?: boolean;
};
type GetTable = (props: GetTableProps) => Promise<Inserts<'tables'>[]>;
export const getTable: GetTable = async ({ id, debug }) => {
	customDebug('Checking valid id', debug);
	const supabaseSelectTable = id
		? supabase.from('tables').select().eq('id', id)
		: supabase.from('tables').select('*');

	customDebug('Run supabase select', debug);
	const { data, error } = await supabaseSelectTable;

	customDebug('Check error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: "No matched ID" });
	return data;
};

export type DeleteTableProps = {
	id: string;
	debug?: boolean;
};
type DeleteTable = (props: DeleteTableProps) => Promise<Tables<'tables'>>;
export const deleteTable: DeleteTable = async ({ id, debug }) => {
	customDebug('Checking ID', debug);
	if (!id || id === undefined) throw customError({ id: 'id', message: 'ID not provided' });

	customDebug('Run supabase select', debug);
	const { error, data } = await supabase.from('tables').delete().eq('id', id).select();

	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: "No matched ID" });
	return data[0];
};

export type UpdateTableProps = Updates<'tables'> & {
	id: string;
	debug?: boolean;
};
type UpdateTable = (props: UpdateTableProps) => Promise<Tables<'tables'>>;
export const updateTable: UpdateTable = async ({ id, debug, ...props }) => {
	customDebug('Checking ID', debug);
	if (!id) throw customError({ id: 'id', message: "'No id provided'" });
	customDebug('Run database upade', debug);
	const { data, error } = await supabase.from('tables').update(props).eq('id', id).select();
	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: "No matched ID" });
	return data[0];
};
