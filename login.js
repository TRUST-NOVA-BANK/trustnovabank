/* =====================================
   TRUSTNOVA BANK
   LOGIN SYSTEM
===================================== */


document.addEventListener(
"DOMContentLoaded",
function(){



const loginForm =
document.getElementById(
"loginForm"
);



if(!loginForm){

    return;

}





loginForm.addEventListener(
"submit",
async function(e){


    e.preventDefault();




    const email =
    document
    .getElementById("email")
    .value
    .trim();




    const password =
    document
    .getElementById("password")
    .value;





    if(!email || !password){


        alert(
        "Please enter email and password"
        );


        return;


    }







    try{



        /*
            Login with Supabase Auth
        */


        const {

            data,

            error

        } =
        await supabase.auth.signInWithPassword({

            email: email,

            password: password

        });







        if(error){


            alert(
            error.message
            );


            return;


        }







        /*
            Save user session
        */


        localStorage.setItem(

            "user",

            JSON.stringify(
                data.user
            )

        );








        /*
            Check if user is admin
        */


        const {

            data:admin

        } =
        await supabase

        .from("admins")

        .select("*")

        .eq(

            "user_id",

            data.user.id

        )

        .single();







        if(admin){


            localStorage.setItem(

                "admin",

                JSON.stringify(
                    admin
                )

            );



            window.location.href =
            "admin-dashboard.html";



        }

        else{



            window.location.href =
            "dashboard.html";



        }





    }

    catch(error){


        console.error(error);


        alert(
        "Login failed. Please try again."
        );


    }



});



});
