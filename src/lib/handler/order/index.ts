import { supabase } from "$lib/supabase";
import type { Tables } from "$lib/types/schema";
import { customError } from "$lib/utils/errorHandler";

type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;


export type GetOrdersProps = {
  id?: string
  table_id?: string
}
export const getOrders: Orders<GetOrdersProps, Tables<"orders">[]> = async ({ id, table_id }) => {
  let query = supabase.from("orders").select("*");

  if (id) {
    query = query.eq("id", id);
  } else if (table_id) {
    query = query.eq("id", table_id);
  }

  const { data, error } = await query;

  if (error) {
    if (id) {
      throw customError({
        id: "id",
        message: `Error fetching order by id: ${error.message}`,
      });
    } else if (table_id) {
      throw customError({
        id: "table_id",
        message: `Error fetching order by table_id: ${error.message}`,
      });
    } else {
      throw customError({
        id: "general",
        message: `Error fetching orders: ${error.message}`,
      });
    }
  }

  return data;
};

