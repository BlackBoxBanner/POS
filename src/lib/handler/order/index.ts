import { supabase } from "$lib/supabase";
import type { Tables } from "$lib/types/schema";
import { customError } from "$lib/utils/errorHandler";

type Orders<T, V = Tables<'orders'>> = (props: T) => Promise<V>;

export type DeleteOrderProps = {
  id: string
}
export const deleteOrder: Orders<DeleteOrderProps, string> = async ({ id }) => {
  if (!id) throw customError({
    id: "id",
    message: "No ID provided"
  })
  const { error } = await supabase.from("orders").delete().eq("id", id).select("")
  if (error) throw customError({
    id: "database",
    message: error.message
  })
  return "successfully delete order"
}