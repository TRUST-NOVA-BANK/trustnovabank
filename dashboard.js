/* =========================================
   TRUSTNOVA BANK
   CUSTOMER DASHBOARD JAVASCRIPT
========================================= */


document.addEventListener("DOMContentLoaded", async () => {


    const user = JSON.parse(
        localStorage.getItem("user")
    );


    if (!user) {

        window.location.href = "login.html";

        return;

    }



    loadUserProfile(user.id);

    loadAccount(user.id);

    loadTransactions(user.id);

    displayDate();


});





/* ===============================
   DISPLAY DATE
================================ */


function displayDate(){

    const dateElement =
    document.getElementById("current_date");


    if(dateElement){

        const today =
        new Date();


        dateElement.textContent =
        today.toLocaleDateString(
            "en-US",
            {
                weekday:"long",
                year:"numeric",
                month:"long",
                day:"numeric"
            }
        );

    }

}





/* ===============================
   LOAD USER PROFILE
================================ */


async function loadUserProfile(userId){


    const { data:userData, error } =
    await supabase
    .from("users")
    .select("*")
    .eq("user_id", userId)
    .single();



    if(error){

        console.log(error.message);

        return;

    }



    document.getElementById("user_name")
    .textContent =
    userData.first_name +
    " " +
    userData.last_name;



    document.getElementById("header_name")
    .textContent =
    userData.first_name;



    document.getElementById("user_email")
    ?.textContent =
    userData.email;



    if(userData.profile_photo){

        document.getElementById("header_photo")
        .src =
        userData.profile_photo;

    }


}





/* ===============================
   LOAD ACCOUNT
================================ */


async function loadAccount(userId){


    const { data:account,error } =
    await supabase
    .from("accounts")
    .select("*")
    .eq("user_id", userId)
    .single();



    if(error){

        console.log(error.message);

        return;

    }



    const formatter =
    new Intl.NumberFormat(
        "en-US",
        {
            style:"currency",
            currency:"USD"
        }
    );



    document.getElementById("account_balance")
    .textContent =
    formatter.format(
        account.balance
    );



    document.getElementById("account_number")
    .textContent =
    "**** **** **** " +
    account.account_number
    .slice(-4);



    document.getElementById("account_status")
    .textContent =
    account.status;



}





/* ===============================
   LOAD TRANSACTIONS
================================ */


async function loadTransactions(userId){


    const {data:account}
    =
    await supabase
    .from("accounts")
    .select("account_id")
    .eq("user_id",userId)
    .single();



    if(!account){

        return;

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
    )
    .limit(5);




    if(error){

        console.log(error.message);

        return;

    }




    const table =
    document.getElementById(
        "transactionList"
    );



    table.innerHTML="";



    if(transactions.length===0){


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




    const formatter =
    new Intl.NumberFormat(
        "en-US",
        {
            style:"currency",
            currency:"USD"
        }
    );




    transactions.forEach(transaction=>{


        table.innerHTML +=
        `

        <tr>

        <td>
        ${new Date(
            transaction.transaction_date
        ).toLocaleDateString("en-US")}
        </td>


        <td>
        ${transaction.description ||
        transaction.transaction_type}
        </td>


        <td>
        ${formatter.format(
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


    localStorage.removeItem("user");


    window.location.href =
    "login.html";


}
