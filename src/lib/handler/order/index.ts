import type { Tables } from "$lib/types/schema";

type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;
