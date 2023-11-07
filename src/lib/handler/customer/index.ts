import type { Tables } from '$lib/types/schema';

type Customer<T, V = Tables<'customers'>> = (props: T) => Promise<V>;
