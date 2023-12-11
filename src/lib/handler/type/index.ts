import type { Inserts, Tables, Updates } from '$lib/types/schema';
import { customError } from '@dookdiks/error';
import { supabase } from '$lib/supabase';

type Type<T, V = Tables<'dish_types'>> = (props: T) => Promise<V>;

export type CreateTypeProps = Pick<Inserts<'dish_types'>, 'name'>;

/**
 * Creates a new dish type.
 * @param {CreateTypeProps} props - The properties for creating the dish type.
 * @returns {Promise<any>} - A promise that resolves to the created dish type.
 * @throws {CustomError} - If the name is not provided or if there is an error during the creation process.
 */
export const createDishType: Type<CreateTypeProps> = async (props) => {
	if (!props.name)
		throw customError({
			id: 'dish_types',
			message: 'Please provide a name'
		});

	const { data, error } = await supabase.from('dish_types').insert(props).select();
	if (error)
		throw customError({
			id: 'Create DishType',
			message: error.message
		});
	if (data.length == 0) throw customError({ id: 'id', message: 'No matched ID' });
	return data[0];
};

export type GetTypeProps = {
	id?: string;
};
/**
 * Retrieves dish types from the database based on the provided parameters.
 *
 * @param {GetTypeProps} props - The parameters for retrieving dish types.
 * @param {number} props.id - The ID of the dish type to retrieve (optional).
 * @returns {Promise<Tables<'dish_types'>[]>} - A promise that resolves to an array of dish types.
 * @throws {CustomError} - If there is an error fetching the dish types.
 */
export const getDishType: Type<GetTypeProps, Tables<'dish_types'>[]> = async ({ id }) => {
	let query = supabase.from('dish_types').select('*');

	if (id) query = query.eq('id', id);

	const { data, error } = await query;

	if (error) {
		if (id) {
			throw customError({
				id: 'id',
				message: `Error fetching dishtype by id: ${error.message}`
			});
		} else {
			throw customError({
				id: 'general',
				message: `Error fetching dishtype: ${error.message}`
			});
		}
	}

	return data;
};

export type UpdateTypeProps = Pick<Updates<'dish_types'>, 'id' | 'name'>;

/**
 * Updates a dish type in the database.
 * @param props - The properties for updating the dish type.
 * @returns The updated dish type.
 * @throws {CustomError} If the ID is missing or if there is an error during the update.
 */
export const updateDishType: Type<UpdateTypeProps> = async (props) => {
	if (!props.id)
		throw customError({
			id: 'id',
			message: 'ID missing'
		});

	console.log(props);
	const { data, error } = await supabase
		.from('dish_types')
		.update(props)
		.eq('id', props.id)
		.select();

	if (error)
		throw customError({
			id: 'id',
			message: error.message
		});
	return data[0];
};

export type DeleteTypeProps = {
	id: string;
};
/**
 * Deletes a dish type from the database.
 * @param {DeleteTypeProps} props - The properties for deleting a dish type.
 * @param {string} props.id - The ID of the dish type to delete.
 * @returns {Promise<string>} A promise that resolves to a success message when the dish type is successfully deleted.
 * @throws {CustomError} Throws a custom error if the ID is not provided or if there is an error deleting the dish type from the database.
 */
export const deleteDishType: Type<DeleteTypeProps, string> = async ({ id }) => {
	if (!id)
		throw customError({
			id: 'id',
			message: 'No ID provided'
		});
	const { error } = await supabase.from('dish_types').delete().eq('id', id).select('');
	if (error)
		throw customError({
			id: 'database',
			message: error.message
		});
	return 'successfully delete dish type';
};
