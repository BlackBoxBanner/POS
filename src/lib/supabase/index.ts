import { createClient } from '@supabase/supabase-js';
import { env } from '$lib/env';

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseRoleKey = env.SUPABASE_SERVICE_ROLE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
export const supabaseAdmin = createClient(supabaseUrl!, supabaseRoleKey!);
