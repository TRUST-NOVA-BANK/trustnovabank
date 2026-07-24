/* =====================================
   TRUSTNOVA BANK
   CUSTOMER REGISTRATION SYSTEM
===================================== */


document.addEventListener(
"DOMContentLoaded",
function(){



const registerForm =
document.getElementById(
"registerForm"
);



if(!registerForm){

    return;

}





registerForm.addEventListener(
"submit",
async function(e){


    e.preventDefault();





    const first_name =
    document
    .getElementById("first_name")
    .value
    .trim();




    const last_name =
    document
    .getElementById("last_name")
    .value
    .trim();




    const email =
    document
    .getElementById("email")
    .value
    .trim();




    const phone =
    document
    .getElementById("phone")
    .value
    .trim();




    const password =
    document
    .getElementById("password")
    .value;








    if(
        !first_name ||
        !last_name ||
        !email ||
        !password
    ){

        alert(
        "Please complete all required fields."
        );


        return;

    }







    try{



        /*
            Create Supabase Auth User
        */


        const {

            data:authData,

            error:authError

        } =
        await supabase.auth.signUp({

            email:email,

            password:password

        });







        if(authError){


            alert(
            authError.message
            );


            return;


        }








        const user =
        authData.user;






        if(!user){


            alert(
            "Registration failed."
            );


            return;


        }









        /*
            Create Customer Profile
        */


        const {

            error:profileError

        } =
        await supabase

        .from("users")

        .insert([{

            user_id:user.id,

            first_name:first_name,

            last_name:last_name,

            email:email,

            phone:phone,

            status:"Active",

            created_at:
            new Date()


        }]);







        if(profileError){


            alert(
            profileError.message
            );


            return;


        }









        /*
            Generate USD Bank Account
        */


        const accountNumber =
        generateAccountNumber();






        const {

            error:accountError

        } =
        await supabase

        .from("accounts")

        .insert([{

            user_id:user.id,

            account_number:
            accountNumber,

            account_type:
            "Checking",

            balance:
            0.00,

            currency:
            "USD",

            status:
            "Active",

            created_at:
            new Date()


        }]);








        if(accountError){


            alert(
            accountError.message
            );


            return;


        }








        /*
            Save Session
        */


        localStorage.setItem(

            "user",

            JSON.stringify(
                user
            )

        );







        alert(
        "Account created successfully!"
        );






        window.location.href =
        "dashboard.html";





    }

    catch(error){


        console.error(error);


        alert(
        "Registration failed. Try again."
        );


    }




});



});








/* =====================================
   ACCOUNT NUMBER GENERATOR
===================================== */


function generateAccountNumber(){



const random =
Math.floor(

Math.random() *

9000000000

)
+
1000000000;




return String(random);



}
