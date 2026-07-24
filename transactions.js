/* =====================================
   TRUSTNOVA BANK
   CUSTOMER TRANSACTION HISTORY
===================================== */



document.addEventListener(
"DOMContentLoaded",
async function(){


    await loadTransactions();


});








/* ===============================
   LOAD TRANSACTIONS
================================ */


async function loadTransactions(){



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







    /*
        Get customer account
    */


    const {

        data:account,

        error:accountError

    } =
    await supabase

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









    /*
        Get transactions
    */


    const {

        data:transactions,

        error:transactionError

    } =
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







    if(transactionError){


        throw transactionError;


    }








    displayTransactions(
        transactions
    );





}

catch(error){



    console.error(error);


    alert(
    "Unable to load transactions."
    );



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
"transactionList"
);





if(!table){

    return;

}






table.innerHTML="";







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


table.innerHTML =

`

<tr>

<td colspan="4">

No transactions available

</td>

</tr>

`;


return;


}







transactions.forEach(
transaction=>{



const date =

new Date(
transaction.transaction_date
)

.toLocaleDateString(
"en-US"
);







table.innerHTML +=

`

<tr>


<td>

${date}

</td>



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
