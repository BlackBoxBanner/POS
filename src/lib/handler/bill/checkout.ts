import { supabase } from "$lib/supabase"
import type { Tables } from "$lib/types/schema"
import { customError } from "$lib/utils/errorHandler"

type HistoryOrders = Tables<"history_order">
type History<T, V = HistoryOrders> = (props: T) => Promise<V>

export type GetHistoryOrder = {
  id?: string
}
export const getHistory: History<GetHistoryOrder, HistoryOrders[]> = async ({ id }) => {
  let query = supabase.from("history_order").select("*")

  if (id) {
    query = query.eq("id", id)
  }
  const { data, error } = await query;

  if (error) {
    if (id) {
      throw customError({
        id: 'id',
        message: `Error fetching order by id: ${error.message}`
      });
    } else {
      throw customError({
        id: 'general',
        message: `Error fetching orders: ${error.message}`
      });
    }
  }

  return data;
}