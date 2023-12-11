import { supabase } from '$lib/supabase';
import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customDebug, customError } from '@dookdiks/error';

export type CreateTableProps = Inserts<'tables'>;
type CreateTable = (props: CreateTableProps) => Promise<Tables<'tables'>>;
/**
 * Creates a new table in the database.
 * @param {Object} options - The options for creating a table.
 * @param {number} options.table_number - The number of the table.
 * @param {number} options.seat - The number of seats at the table.
 * @param {Object} options.rest - Additional properties for the table.
 * @returns {Promise<Object>} The newly created table object.
 * @throws {Error} If the table number or seat is not provided.
 * @throws {Error} If there is an error inserting the table into the database.
 * @throws {Error} If no matched ID is found in the database.
 */
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
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};

export type GetTableProps = {
	id?: string;
	debug?: boolean;
};
type GetTable = (props: GetTableProps) => Promise<Inserts<'tables'>[]>;
/**
 * Retrieves a table from the database based on the provided ID.
 * If no ID is provided, retrieves all tables.
 * 
 * @param {Object} options - The options for retrieving the table.
 * @param {string} options.id - The ID of the table to retrieve.
 * @param {boolean} options.debug - Whether to enable debug mode.
 * 
 * @returns {Promise<Array<Object>>} The retrieved table(s).
 * 
 * @throws {CustomError} If there is an error retrieving the table(s) or if no matched ID is found.
 */
export const getTable: GetTable = async ({ id, debug }) => {
	customDebug('Checking valid id', debug);
	const supabaseSelectTable = id
		? supabase.from('tables').select().eq('id', id)
		: supabase.from('tables').select('*');

	customDebug('Run supabase select', debug);
	const { data, error } = await supabaseSelectTable;

	customDebug('Check error', debug);
	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data;
};

export type DeleteTableProps = {
	id: string;
	debug?: boolean;
};
type DeleteTable = (props: DeleteTableProps) => Promise<Tables<'tables'>>;
/**
 * Deletes a table from the database.
 *
 * @param {Object} options - The options for deleting the table.
 * @param {string} options.id - The ID of the table to delete.
 * @param {boolean} [options.debug] - Whether to enable debug mode.
 * @returns {Promise<Object>} The deleted table object.
 * @throws {Error} If the ID is not provided.
 * @throws {Error} If there is an error during the deletion process.
 * @throws {Error} If no table with the provided ID is found.
 */
export const deleteTable: DeleteTable = async ({ id, debug }) => {
	customDebug('Checking ID', debug);
	if (!id || id === undefined) throw customError({ id: 'id', message: 'ID not provided' });

	customDebug('Run supabase select', debug);
	const { error, data } = await supabase.from('tables').delete().eq('id', id).select();

	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};

export type UpdateTableProps = Updates<'tables'> & {
	id: string;
	debug?: boolean;
};
type UpdateTable = (props: UpdateTableProps) => Promise<Tables<'tables'>>;
/**
 * Updates a table in the database.
 * @param {Object} options - The options for updating the table.
 * @param {string} options.id - The ID of the table to update.
 * @param {boolean} options.debug - Whether to enable debug mode.
 * @param {Object} props - The properties to update in the table.
 * @returns {Promise<Object>} The updated table object.
 * @throws {Error} If no ID is provided.
 * @throws {Error} If there is an error during the database update.
 * @throws {Error} If no matching ID is found.
 */
export const updateTable: UpdateTable = async ({ id, debug, ...props }) => {
	customDebug('Checking ID', debug);
	if (!id) throw customError({ id: 'id', message: "'No id provided'" });
	customDebug('Run database upade', debug);
	const { data, error } = await supabase.from('tables').update(props).eq('id', id).select();
	if (error) throw customError({ id: 'id', message: error.message });
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};
