/* =====================================
   TRUSTNOVA BANK
   SUPABASE CONFIGURATION
===================================== */


/*
    Supabase Connection

    Replace the values below:

    SUPABASE_URL:
    Supabase Dashboard
    → Project Settings
    → API
    → Project URL


    SUPABASE_ANON_KEY:
    Supabase Dashboard
    → Project Settings
    → API
    → anon public key

*/



const SUPABASE_URL = 
"https://YOUR_PROJECT_ID.supabase.co";



const SUPABASE_ANON_KEY =
"YOUR_ANON_PUBLIC_KEY";







/* =====================================
   CREATE SUPABASE CLIENT
===================================== */


const supabase = 
window.supabase.createClient(

    SUPABASE_URL,

    SUPABASE_ANON_KEY

);







/* =====================================
   AUTH HELPERS
===================================== */



async function getCurrentUser(){


    const {

        data,

        error

    } = await supabase.auth.getUser();



    if(error){

        return null;

    }



    return data.user;


}







async function logout(){


    await supabase.auth.signOut();


    localStorage.removeItem("user");

    localStorage.removeItem("admin");


    window.location.href =
    "login.html";


}







/* =====================================
   SAVE USER SESSION
===================================== */



async function saveUserSession(){


    const user =
    await getCurrentUser();



    if(user){


        localStorage.setItem(

            "user",

            JSON.stringify(user)

        );


    }


}





/* =====================================
   CHECK LOGIN
===================================== */


async function requireLogin(){


    const user =
    await getCurrentUser();



    if(!user){


        window.location.href =
        "login.html";


        return false;


    }



    return true;


}







/* =====================================
   CHECK ADMIN
===================================== */


async function requireAdmin(){


    const user =
    await getCurrentUser();



    if(!user){


        window.location.href =
        "login.html";


        return false;


    }





    const {

        data:admin

    } = await supabase

    .from("admins")

    .select("*")

    .eq(

        "user_id",

        user.id

    )

    .single();





    if(!admin){


        window.location.href =
        "dashboard.html";


        return false;


    }




    localStorage.setItem(

        "admin",

        JSON.stringify(admin)

    );



    return true;


}
