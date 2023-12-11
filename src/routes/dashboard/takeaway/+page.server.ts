import { getOrders } from '$lib/handler/order';
import { supabase } from '$lib/supabase';
import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import type { CustomerOrder } from '$lib/types/table';

export const load = (async () => {
	const { data: order, error: orderError } = await supabase.from('orders_takeaway').select('*');
	if (orderError) throw error(400, 'Error fetching orders');

	const { data: customer_takeaway, error: customer_takeawayError } = await supabase
		.from('customer_takeaway')
		.select('*');
	if (customer_takeawayError) throw error(400, 'Error fetching customers');

	const { data: order_takeaway_lists, error: order_takeaway_listError } = await supabase
		.from('order_takeaway_list')
		.select('*');
	if (order_takeaway_listError) throw error(400, 'Error fetching customers');

	const { data: menus, error: menusError } = await supabase.from('menus').select('*');
	if (menusError) throw error(400, 'Error fetching customers');

	/**
	 * Maps the order data to customer orders with additional information.
	 *
	 * @param order - The array of orders.
	 * @param order_takeaway_lists - The array of order takeaway lists.
	 * @param customer_takeaway - The array of customer takeaway data.
	 * @param menus - The array of menu data.
	 * @returns An array of customer orders with updated order takeaway list and customer name.
	 * @throws {Error} If there is an error fetching customers or menus.
	 */
	const customerOrder: CustomerOrder[] = order.map((order) => {
		const order_takeaway_list = order_takeaway_lists.filter((order_takeaway_list) => {
			return order_takeaway_list.order_id === order.id;
		});

		const customer = customer_takeaway.find((customer) => customer.id === order.customer_id);
		if (!customer) throw error(400, 'Error fetching customers');

		type OrderTakeAway = typeof updatedOrderTakeawayList;
		const updatedOrderTakeawayList = order_takeaway_list.map((item) => {
			const menu = menus.find((menu) => menu.name === item.menu);
			if (!menu) throw error(400, 'Error fetching menus');

			return {
				...item,
				price: menu.price
			};
		});

		const uniqueOrderTakeawayList = updatedOrderTakeawayList.reduce((result, item) => {
			const existingItem = result.find((uniqueItem) => {
				return uniqueItem.order_id === item.order_id && uniqueItem.menu === item.menu;
			});

			if (existingItem) {
				item.portios = existingItem.portios += item.portios;
			} else {
				result.push(item);
			}
			return result;
		}, [] as OrderTakeAway);

		return { ...order, order_takeaway_list: uniqueOrderTakeawayList, name: customer.name };
	});

	return { order, customer_takeaway, customerOrder };
}) satisfies PageServerLoad;
