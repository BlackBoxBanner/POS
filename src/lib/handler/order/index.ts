import { supabase } from "$lib/supabase";
import type { Tables, Updates } from "$lib/types/schema";
import { customError } from "$lib/utils/errorHandler";

type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;

export type UpdateOrder = Pick<Updates<"orders">, "menu" | "status" | "id">

export const updateOrder: Orders<UpdateOrder> = async (props) => {
  if (!props.id) throw customError({
    id: "id",
    message: "ID missing"
  })
  const { data, error } = await supabase.from("orders").update(props).eq("id", props.id).select()

  if (error) throw customError({
    id: "id",
    message: error.message
  })
  return data[0]
}