import { createClient } from '@supabase/supabase-js';
import type { Database } from '$lib/types/schema';
import { SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY } from '$env/static/private';

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_ANON_KEY);
export const supabaseAdmin = createClient<Database>(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);
