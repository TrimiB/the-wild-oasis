import { createClient } from '@supabase/supabase-js';

export const supabaseUrl = 'https://ixwbphutnwjiiuktwtgl.supabase.co';
const supabaseKey = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Iml4d2JwaHV0bndqaWl1a3R3dGdsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjYzNDE5ODgsImV4cCI6MjA0MTkxNzk4OH0.KQTMoGXhKtDaJIrzt2l0WT1uplO_CHPyEWXjvgBkDhE`;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
