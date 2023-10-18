import { createClient } from '@supabase/supabase-js';
import { env } from '$lib/env';

const supabaseUrl = env.SUPEABASE_URL;
const supabaseKey = env.SUPABASE_KEY;

export const supabase = createClient(supabaseUrl!, supabaseKey!);
