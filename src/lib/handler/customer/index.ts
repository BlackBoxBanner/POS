import { supabase } from '$lib/supabase';
import type { Tables, Updates } from '$lib/types/schema';
import { customError } from '$lib/utils/errorHandler';

type Customer<T, V = Tables<'customers'>> = (props: T) => Promise<V>;


export type UpdateCustomerProps = Pick<Updates<"customers">, "table_id" | "check_out_at" | "take_away"> & {
  id: string
}
export const updateCustomer: Customer<UpdateCustomerProps> = async ({ id, ...props }) => {
  const { data, error } = await supabase.from("customers").update(props).eq("id", id).select()

  if (error) throw customError({
    id: "id",
    message: error.message
  })

  return data[0]
}