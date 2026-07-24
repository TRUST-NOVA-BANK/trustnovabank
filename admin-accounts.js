/* =====================================
   TRUSTNOVA BANK
   ADMIN ACCOUNT MANAGEMENT
===================================== */



document.addEventListener(
"DOMContentLoaded",
async function(){



    const allowed =
    await checkAdmin();



    if(!allowed){

        return;

    }



    await loadAccounts();





    const search =
    document.getElementById(
        "searchAccount"
    );



    if(search){


        search.addEventListener(
            "keyup",
            searchAccounts
        );


    }



});







let accountsData = [];









/* ===============================
   ADMIN SECURITY CHECK
================================ */


async function checkAdmin(){



try{



const {

data:userData,

error

}
=
await supabase.auth.getUser();






if(error || !userData.user){


window.location.href =
"login.html";


return false;


}






const {

data:admin

}
=
await supabase

.from("admins")

.select("*")

.eq(

"user_id",

userData.user.id

)

.single();







if(!admin){


window.location.href =
"dashboard.html";


return false;


}





return true;



}

catch(error){


console.error(error);


return false;


}



}









/* ===============================
   LOAD ACCOUNTS
================================ */


async function loadAccounts(){



try{



const {

data:accounts,

error

}
=
await supabase

.from("accounts")

.select(`

*,

users(

first_name,

last_name

)

`)

.order(

"created_at",

{

ascending:false

}

);






if(error){


throw error;


}






accountsData =
accounts || [];





displayAccounts(
accountsData
);





}

catch(error){


console.error(error);


alert(
"Unable to load accounts."
);


}



}









/* ===============================
   DISPLAY ACCOUNTS
================================ */


function displayAccounts(accounts){



const table =
document.getElementById(
"accountsTable"
);





table.innerHTML = "";







const money =
new Intl.NumberFormat(

"en-US",

{

style:"currency",

currency:"USD"

}

);








if(accounts.length===0){


table.innerHTML =

`

<tr>

<td colspan="6">

No accounts found

</td>

</tr>

`;

return;


}








accounts.forEach(
account=>{





const customer =

account.users

?

account.users.first_name
+
" "
+
account.users.last_name

:

"Unknown";







table.innerHTML +=

`

<tr>


<td>

****${String(
account.account_number
)
.slice(-4
