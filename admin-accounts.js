/* =====================================
   TRUSTNOVA BANK
   ADMIN ACCOUNT MANAGEMENT
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


checkAdmin();

loadAccounts();



document
.getElementById("searchAccount")
.addEventListener(
"keyup",
searchAccounts
);



});






let accountsData = [];







/* ===============================
   ADMIN SECURITY CHECK
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


}








/* ===============================
   LOAD ACCOUNTS
================================ */


async function loadAccounts(){


try{



const {data:accounts,error}
=
await supabase
.from("accounts")
.select("*")
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


console.error(
error.message
);



document.getElementById(
"accountsTable"
)
.innerHTML =

`

<tr>

<td colspan="7">

${error.message}

</td>

</tr>

`;



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



table.innerHTML="";



if(accounts.length===0){


table.innerHTML =

`

<tr>

<td colspan="7">

No accounts found

</td>

</tr>

`;

return;


}





const money =
new Intl.NumberFormat(
"en-US",
{

style:"currency",

currency:"USD"

});






accounts.forEach(
account=>{


const statusClass =
account.status === "Active"
?
"active-status"
:
"inactive-status";





table.innerHTML +=


`

<tr>


<td>

${account.account_id}

</td>



<td>

**** **** ${

String(
account.account_number
)
.slice(-4)

}

</td>



<td>

${account.user_id}

</td>



<td>

${account.account_type || "Checking"}

</td>



<td class="balance">

${money.format(
account.balance || 0
)}

</td>




<td class="${statusClass}">

${account.status}

</td>





<td>


<button

class="action-btn"

onclick="toggleAccountStatus(

'${account.account_id}',

'${account.status}'

)"

>


${account.status === "Active"
?
"Disable"
:
"Activate"}

</button>


</td>



</tr>


`;



});



}









/* ===============================
   UPDATE ACCOUNT STATUS
================================ */


async function toggleAccountStatus(
id,
status
){



const newStatus =
status === "Active"
?
"Inactive"
:
"Active";





const {error}
=
await supabase
.from("accounts")
.update({

status:newStatus

})
.eq(
"account_id",
id
);





if(error){


alert(
error.message
);


return;


}





loadAccounts();



}









/* ===============================
   SEARCH ACCOUNTS
================================ */


function searchAccounts(){


const value =
document
.getElementById(
"searchAccount"
)
.value
.toLowerCase();




const filtered =
accountsData.filter(
account=>{


return (

String(
account.account_number
)
.toLowerCase()
.includes(value)

||

String(
account.user_id
)
.toLowerCase()
.includes(value)

);


});




displayAccounts(
filtered
);



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
