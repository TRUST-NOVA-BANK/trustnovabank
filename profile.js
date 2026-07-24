/* =====================================
   TRUSTNOVA BANK
   CUSTOMER PROFILE SYSTEM
===================================== */



document.addEventListener(
"DOMContentLoaded",
async function(){


    await loadProfile();



    const updateButton =
    document.getElementById(
        "updateProfile"
    );


    if(updateButton){


        updateButton.addEventListener(
        "click",
        updateProfile
        );


    }


});








/* ===============================
   LOAD PROFILE
================================ */


async function loadProfile(){


try{



    const {

        data:userData,

        error:userError

    } =
    await supabase.auth.getUser();





    if(userError || !userData.user){


        window.location.href =
        "login.html";


        return;


    }







    const user =
    userData.user;







    const {

        data:profile,

        error

    } =
    await supabase

    .from("users")

    .select("*")

    .eq(

        "user_id",

        user.id

    )

    .single();







    if(error){


        throw error;


    }








    document.getElementById(
        "first_name"
    ).value =
    profile.first_name || "";





    document.getElementById(
        "last_name"
    ).value =
    profile.last_name || "";





    document.getElementById(
        "email"
    ).value =
    profile.email || "";





    document.getElementById(
        "phone"
    ).value =
    profile.phone || "";





    if(profile.profile_photo){


        document.getElementById(
            "profile_photo"
        ).src =
        profile.profile_photo;


    }





}

catch(error){


    console.error(error);


    alert(
    "Unable to load profile."
    );


}



}









/* ===============================
   UPDATE PROFILE
================================ */


async function updateProfile(){



try{



    const {

        data:userData

    } =
    await supabase.auth.getUser();





    const user =
    userData.user;







    const first_name =
    document
    .getElementById(
        "first_name"
    )
    .value
    .trim();






    const last_name =
    document
    .getElementById(
        "last_name"
    )
    .value
    .trim();






    const phone =
    document
    .getElementById(
        "phone"
    )
    .value
    .trim();








    const {

        error

    } =
    await supabase

    .from("users")

    .update({

        first_name:first_name,

        last_name:last_name,

        phone:phone

    })

    .eq(

        "user_id",

        user.id

    );








    if(error){


        throw error;


    }






    alert(
    "Profile updated successfully."
    );



    loadProfile();





}

catch(error){


    console.error(error);


    alert(
    error.message
    );


}



}







/* ===============================
   LOGOUT
================================ */


async function logout(){



await supabase.auth.signOut();



localStorage.removeItem(
"user"
);



window.location.href =
"login.html";


}
