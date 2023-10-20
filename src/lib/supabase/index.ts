import { createClient } from '@supabase/supabase-js';
import { env } from '$lib/env';
import type { Database } from '$lib/types/schema';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient<Database>(supabaseUrl!, supabaseKey!);
export const supabaseAdmin = createClient<Database>(supabaseUrl!, supabaseRoleKey!);
