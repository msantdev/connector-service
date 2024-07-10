import { createClient, SupabaseClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

const supabaseUrl = process.env.SUPABASE_URL || 'https://fennevimahphouhixmql.supabase.co';
const supabaseKey = process.env.SUPABASE_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZlbm5ldmltYWhwaG91aGl4bXFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjA0NTYyMDAsImV4cCI6MjAzNjAzMjIwMH0.bqsh8RuI9j_mKyfFoPlZClk92SvLIFP8I7xQDih8cw0';

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

async function checkConnection() {
  try {
    const { data, error } = await supabase.from('users').select('*');
    if (error) {
      throw error;
    }
    console.log('Connected to Supabase');
  } catch (error) {
    console.error('Error connecting to Supabase:', error);
  }
}

checkConnection();

export default supabase;
