/* =====================================
   TRUSTNOVA BANK
   SUPABASE CONNECTION
===================================== */


/*
   Replace these two values
   with your Supabase project details

   Supabase Dashboard
   Settings
   API
*/


const SUPABASE_URL = 
"https://YOUR_PROJECT_ID.supabase.co";


const SUPABASE_ANON_KEY =
"YOUR_SUPABASE_ANON_KEY";





/* Create Supabase Client */


const supabaseClient =
supabase.createClient(

    SUPABASE_URL,

    SUPABASE_ANON_KEY

);
