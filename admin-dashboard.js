/* =====================================
   TRUSTNOVA BANK
   ADMIN DASHBOARD SYSTEM
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


checkAdmin();

loadStatistics();


});






/* ===============================
   ADMIN CHECK
================================ */


function checkAdmin(){


const admin =
JSON.parse(
localStorage.getItem("admin")
);



if(!admin){


window.location.href =
"login.html";


return;


}



const adminName =
document.getElementById(
"admin_name"
);



if(adminName){

adminName.textContent =
admin.full_name ||
"Administrator";

}



}







/* ===============================
   LOAD BANK STATISTICS
================================ */


async function loadStatistics(){



try{



/* TOTAL USERS */


const {count:userCount,error:userError}
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



if(userError)
throw userError;





document.getElementById(
"total_users"
)
.textContent =
userCount || 0;









/* TOTAL ACCOUNTS */


const {count:accountCount,error:accountError}
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





if(accountError)
throw accountError;





document.getElementById(
"total_accounts"
)
.textContent =
accountCount || 0;









/* TRANSACTIONS */


const {data:transactions,error:transactionError}
=
await supabase
.from("transactions")
.select(
"amount"
);




if(transactionError)
throw transactionError;





document.getElementById(
"total_transactions"
)
.textContent =
transactions.length;







/* TOTAL VOLUME */


let totalVolume = 0;



transactions.forEach(
(transaction)=>{


totalVolume +=
Number(transaction.amount);


});






const money =
new Intl.NumberFormat(
"en-US",
{

style:"currency",

currency:"USD"

});





document.getElementById(
"total_volume"
)
.textContent =
money.format(
totalVolume
);





}

catch(error){


console.error(
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
"admin"
);



window.location.href =
"login.html";


}
