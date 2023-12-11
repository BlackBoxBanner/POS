import type { Tables } from '$lib/types/schema';

type TableIn = {
	created_at: string;
	id: string;
	seat: number;
	seated: number | null;
	table_number: number;
	time: string | null;
};

type CustomerOrder = Tables<'orders_takeaway'> & {
	order_takeaway_list: (Tables<'order_takeaway_list'> & { price: number })[];
	name: string;
};
