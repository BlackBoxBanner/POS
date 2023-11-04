type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;
