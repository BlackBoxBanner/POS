import type { Tables } from '$lib/types/schema';

type Type<T, V = Tables<'dish_types'>> = (props: T) => Promise<V>;

export const createDishType: Type<{}> = async () => {
	return;
};
