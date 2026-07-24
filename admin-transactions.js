/* =====================================
   TRUSTNOVA BANK
   ADMIN TRANSACTION MONITORING
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


checkAdmin();

loadTransactions();



document
.getElementById(
"searchTransaction"
)
.addEventListener(
"keyup",
filterTransactions
);



document
.getElementById(
"statusFilter"
)
.addEventListener(
"change",
filterTransactions
);



});







let transactionsData = [];








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


}









/* ===============================
   LOAD TRANSACTIONS
================================ */


async function loadTransactions(){


try{



const {data:transactions,error}
=
await supabase
.from("transactions")
.select("*")
.order(
"transaction_date",
{
ascending:false
}
);





if(error){

throw error;

}



transactionsData =
transactions || [];



displayTransactions(
transactionsData
);



}

catch(error){


console.error(
error.message
);



document.getElementById(
"transactionsTable"
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
   DISPLAY TRANSACTIONS
================================ */


function displayTransactions(
transactions
){



const table =
document.getElementById(
"transactionsTable"
);



table.innerHTML="";





if(transactions.length===0){


table.innerHTML =

`

<tr>

<td colspan="7">

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



const statusClass =
(
transaction.status ||
""
)
.toLowerCase();





table.innerHTML +=


`

<tr>


<td>

${transaction.transaction_id}

</td>



<td>

${transaction.account_id}

</td>



<td>

${transaction.transaction_type || "Transfer"}

</td>



<td>

${transaction.description || "Bank Transfer"}

</td>




<td class="amount">

${money.format(
transaction.amount || 0
)}

</td>





<td class="${statusClass}">

${transaction.status}

</td>





<td>

${new Date(
transaction.transaction_date
)
.toLocaleDateString(
"en-US"
)}

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
transactionsData.filter(
transaction=>{



const text =

(

transaction.description ||

""

+

transaction.transaction_type ||

""

+

transaction.account_id ||

""

)
.toLowerCase();






const matchSearch =
text.includes(
searchValue
);





const matchStatus =

statusValue === "all"

||

transaction.status === statusValue;





return matchSearch &&
matchStatus;



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
"admin"
);



window.location.href =
"login.html";


}
