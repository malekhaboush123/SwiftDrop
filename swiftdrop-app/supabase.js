import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://hecfdmlzmgtmvjwchivc.supabase.co';
const supabaseAnonKey = 'sb_publishable_4oVxOn54VF7HDE-VX_HCCA_bUGNxmHl';

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false,
  },
});