import type { Inserts ,Tables } from '$lib/types/schema';
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
