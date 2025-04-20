// supabase.client.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://xgkxodturstpjmjteres.supabase.co';
const supabaseKey =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inhna3hvZHR1cnN0cGptanRlcmVzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUxODA0NzIsImV4cCI6MjA2MDc1NjQ3Mn0.clkifiM13nwDL_4gGa9kahoQRlfYUvQMX5OPETCYVQ8';

export const supabase = createClient(supabaseUrl, supabaseKey);
