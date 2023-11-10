import type { Inserts ,Tables, Updates } from '$lib/types/schema';
import { customError } from '$lib/utils/errorHandler';
import { supabase } from '$lib/supabase';



type Type<T, V = Tables<'dish_types'>> = (props: T) => Promise<V>;

export type CreateTypeProps = Pick<Inserts<'dish_types'>, 'name'>

export const createDishType: Type<CreateTypeProps> = async (props) => {
	
	if (!props.name) 
		throw customError({
			id: 'dish_types',
			message: 'Please provide a name'	
		})
	
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


export type UpdateTypeProps = Pick<Updates<'dish_types'>,  'id' | 'name'>;

export const updateDishType: Type<UpdateTypeProps> = async (props) => {
	if (!props.id)
		throw customError({
			id: 'id',
			message: 'ID missing'
		});

	console.log(props)
	const { data, error } = await supabase.from('dish_types').update(props).eq('id', props.id).select();

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