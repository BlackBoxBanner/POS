import { supabase } from '$lib/supabase';
import type { LayoutServerLoad } from './$types';

export const load = (async () => {
  const { data: { session }, error } = await supabase.auth.getSession()
  if (error) throw new Error(error.message)
  return { session };
}) satisfies LayoutServerLoad;