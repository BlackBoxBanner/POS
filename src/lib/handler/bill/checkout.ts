import { supabase } from '$lib/supabase';
import type { Inserts, Tables } from '$lib/types/schema';
import { customError } from '$lib/utils/errorHandler';

type HistoryOrders = Tables<'history_order'>;
type History<T, V = HistoryOrders> = (props: T) => Promise<V>;

export type CreateHistoryProps = Pick<Inserts<"history_order">, "customer_id" | "menus">

export const createHistory: History<CreateHistoryProps> = async ({ menus, customer_id }) => {
  if (!menus || menus.length == 0) throw customError({
    id: "menus",
    message: "No menus provided"
  })
  if (!customer_id) throw customError({
    id: "customer_id",
    message: "no customer_id provided"
  })

  const { data, error } = await supabase.from("history_order").insert({ menus, customer_id }).select()

  if (error) throw customError({
    id: error.hint,
    message: error.message
  })

  return data[0]
}