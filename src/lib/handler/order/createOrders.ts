import { supabase } from "$lib/supabase"
import type { Inserts, Tables } from "$lib/types/schema"
import { customError } from "$lib/utils/errorHandler"

type Orders<T> = (props: T) => Promise<Tables<"orders">>

export type CreateOrderProps = Pick<Inserts<"orders">, "table_id" | "menu_id">

export const createOrder: Orders<CreateOrderProps> = async (props) => {
  const { data, error } = await supabase.from("orders").insert(props).select()
  if (error) throw customError({
    id: "Create Order",
    message: error.message
  })
	if (data.length == 0) throw customError({ id: 'id', message: "No matched ID" });
  return data[0]
}