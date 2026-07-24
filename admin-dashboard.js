/* =====================================
   TRUSTNOVA BANK
   ADMIN DASHBOARD SYSTEM
===================================== */



document.addEventListener(
"DOMContentLoaded",
async function(){


    const allowed =
    await checkAdmin();



    if(!allowed){

        return;

    }




    loadStatistics();



});









/* ===============================
   ADMIN SECURITY CHECK
================================ */


async function checkAdmin(){



try{



    const {

        data:userData,

        error

    } =
    await supabase.auth.getUser();






    if(error || !userData.user){


        window.location.href =
        "login.html";


        return false;


    }






    const user =
    userData.user;








    const {

        data:admin

    } =
    await supabase

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

catch(error){


    console.error(error);


    window.location.href =
    "login.html";


    return false;


}



}









/* ===============================
   LOAD STATISTICS
================================ */


async function loadStatistics(){



try{





const {

count:customers

}

=

await supabase

.from("users")

.select(

"*",

{

count:"exact",

head:true

}

);









const {

count:accounts

}

=

await supabase

.from("accounts")

.select(

"*",

{

count:"exact",

head:true

}

);









const {

data:balances

}

=

await supabase

.from("accounts")

.select(

"balance"

);







let totalBalance = 0;





balances.forEach(

account=>{


totalBalance +=

Number(
account.balance || 0
);


}

);









const {

count:transactions

}

=

await supabase

.from("transactions")

.select(

"*",

{

count:"exact",

head:true

}

);









document.getElementById(
"totalCustomers"
)
.textContent =
customers || 0;






document.getElementById(
"totalAccounts"
)
.textContent =
accounts || 0;






document.getElementById(
"totalTransactions"
)
.textContent =
transactions || 0;







document.getElementById(
"totalBalance"
)
.textContent =

new Intl.NumberFormat(

"en-US",

{

style:"currency",

currency:"USD"

}

)

.format(
totalBalance
);






}

catch(error){



console.error(error);


alert(
"Unable to load dashboard statistics."
);



}



}









/* ===============================
   LOGOUT
================================ */


async function logout(){



await supabase.auth.signOut();



localStorage.removeItem(
"admin"
);



localStorage.removeItem(
"user"
);



window.location.href =
"login.html";



}
