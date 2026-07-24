/* =====================================
   TRUSTNOVA BANK
   TRANSACTIONS SYSTEM
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const user =
JSON.parse(
localStorage.getItem("user")
);



if(!user){

window.location.href="login.html";

return;

}



loadTransactions();



const search =
document.getElementById(
"searchTransaction"
);


const filter =
document.getElementById(
"statusFilter"
);



search.addEventListener(
"keyup",
filterTransactions
);



filter.addEventListener(
"change",
filterTransactions
);



});





let allTransactions = [];





/* ===============================
   LOAD TRANSACTIONS
================================ */


async function loadTransactions(){


try{


const {data:account,error:accountError}
=
await supabase
.from("accounts")
.select("account_id")
.eq(
"user_id",
JSON.parse(
localStorage.getItem("user")
).id
)
.single();




if(accountError){

throw accountError;

}





const {data:transactions,error}
=
await supabase
.from("transactions")
.select("*")
.eq(
"account_id",
account.account_id
)
.order(
"transaction_date",
{
ascending:false
}
);





if(error){

throw error;

}



allTransactions =
transactions || [];



displayTransactions(
allTransactions
);



}

catch(error){


console.error(error);


document.getElementById(
"transactionTable"
)
.innerHTML =
`

<tr>

<td colspan="5">

${error.message}

</td>

</tr>

`;

}



}







/* ===============================
   DISPLAY TRANSACTIONS
================================ */


function displayTransactions(
transactions
){



const table =
document.getElementById(
"transactionTable"
);



table.innerHTML="";





if(transactions.length===0){


table.innerHTML=
`

<tr>

<td colspan="5">

No transactions found

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





transactions.forEach(
transaction=>{



let statusClass =
transaction.status
.toLowerCase();



table.innerHTML +=

`

<tr>


<td>

${new Date(
transaction.transaction_date
)
.toLocaleDateString(
"en-US"
)}

</td>



<td>

${transaction.description ||
"Bank Transaction"}

</td>



<td>

${transaction.transaction_type}

</td>



<td>

${money.format(
transaction.amount
)}

</td>



<td class="${statusClass}">

${transaction.status}

</td>



</tr>

`;



});


}







/* ===============================
   SEARCH + FILTER
================================ */


function filterTransactions(){


const searchValue =
document
.getElementById(
"searchTransaction"
)
.value
.toLowerCase();



const statusValue =
document
.getElementById(
"statusFilter"
)
.value;





const filtered =
allTransactions.filter(
transaction=>{



const matchesSearch =

(
transaction.description ||
""
)
.toLowerCase()
.includes(searchValue)

||

(
transaction.transaction_type ||
""
)
.toLowerCase()
.includes(searchValue);





const matchesStatus =

statusValue === "all"

||

transaction.status === statusValue;




return matchesSearch &&
matchesStatus;



});




displayTransactions(
filtered
);



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



