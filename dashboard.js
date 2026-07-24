/* =====================================
   TRUSTNOVA BANK
   CUSTOMER DASHBOARD SYSTEM
===================================== */



document.addEventListener(
"DOMContentLoaded",
async function(){


    await loadDashboard();



});








/* ===============================
   LOAD DASHBOARD
================================ */


async function loadDashboard(){



try{



    const {

        data:userData,

        error:userError

    } = await supabase.auth.getUser();




    if(userError || !userData.user){


        window.location.href =
        "login.html";


        return;


    }





    const user =
    userData.user;







    /*
        Load customer profile
    */


    const {

        data:profile,

        error:profileError

    } = await supabase

    .from("users")

    .select("*")

    .eq(

        "user_id",

        user.id

    )

    .single();






    if(profileError){

        throw profileError;

    }







    displayProfile(profile);








    /*
        Load account
    */


    const {

        data:account,

        error:accountError

    } = await supabase

    .from("accounts")

    .select("*")

    .eq(

        "user_id",

        user.id

    )

    .single();







    if(accountError){

        throw accountError;

    }






    displayAccount(account);








    /*
        Load transactions
    */


    await loadTransactions(

        account.account_id

    );





}

catch(error){


    console.error(error);


    alert(
        "Unable to load dashboard"
    );


}




}









/* ===============================
   DISPLAY PROFILE
================================ */


function displayProfile(profile){



const name =
document.getElementById(
"user_name"
);



if(name){


name.textContent =

profile.first_name
+
" "
+
profile.last_name;


}






const email =
document.getElementById(
"user_email"
);



if(email){


email.textContent =
profile.email;


}






const photo =
document.getElementById(
"user_photo"
);



if(
photo &&
profile.profile_photo
){


photo.src =
profile.profile_photo;


}





}









/* ===============================
   DISPLAY ACCOUNT
================================ */


function displayAccount(account){



const money =
new Intl.NumberFormat(
"en-US",
{

style:"currency",

currency:"USD"

});






const balance =
document.getElementById(
"balance"
);



if(balance){


balance.textContent =
money.format(
account.balance || 0
);


}







const accountNumber =
document.getElementById(
"account_number"
);



if(accountNumber){


accountNumber.textContent =

"**** **** "
+
String(
account.account_number
)
.slice(-4);


}







const type =
document.getElementById(
"account_type"
);



if(type){


type.textContent =
account.account_type;


}







const status =
document.getElementById(
"user_status"
);



if(status){


status.textContent =
account.status;


}



}









/* ===============================
   TRANSACTIONS
================================ */


async function loadTransactions(
accountId
){



const {

data:transactions,

error

} = await supabase

.from("transactions")

.select("*")

.eq(

"account_id",

accountId

)

.order(

"transaction_date",

{

ascending:false

}

)

.limit(5);







if(error){


console.error(error);


return;


}







const list =
document.getElementById(
"transactionList"
);





if(!list){

return;

}





list.innerHTML="";





const money =
new Intl.NumberFormat(
"en-US",
{

style:"currency",

currency:"USD"

});






if(
transactions.length === 0
){


list.innerHTML =

`

<tr>

<td colspan="3">

No transactions yet

</td>

</tr>

`;


return;


}







transactions.forEach(
(transaction)=>{



list.innerHTML +=

`

<tr>

<td>

${transaction.description || "Transfer"}

</td>


<td>

${money.format(
transaction.amount
)}

</td>


<td>

${transaction.status}

</td>


</tr>

`;


});



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
