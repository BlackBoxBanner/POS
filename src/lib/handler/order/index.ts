import { supabase } from "$lib/supabase";
import type { Tables } from "$lib/types/schema";
import { customError } from "$lib/utils/errorHandler";

type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;


export type GetOrdersProps = {
  id?: string
}
export const getOrders: Orders<GetOrdersProps, Tables<"orders">[]> = async ({ id }) => {
  if (id) {
    const { data, error } = await supabase.from("orders").select().eq("id", id)
    if (error) throw customError({
      id: "id",
      message: error.message
    })
    return data
  } else {
    const { data, error } = await supabase.from("orders").select("*")
    if (error) throw customError({
      id: "id",
      message: error.message
    })
    return data
  }
}
