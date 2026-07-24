async function loadAdminDashboard(){


const { data: users } = await supabase
.from("users")
.select("*");


const { data: accounts } = await supabase
.from("accounts")
.select("*");


const { data: transactions } = await supabase
.from("transactions")
.select("*");


const { data: tickets } = await supabase
.from("support_tickets")
.select("*");



document.getElementById("total_users").innerHTML =
users ? users.length : 0;


document.getElementById("total_accounts").innerHTML =
accounts ? accounts.length : 0;


document.getElementById("total_transactions").innerHTML =
transactions ? transactions.length : 0;


document.getElementById("total_tickets").innerHTML =
tickets ? tickets.length : 0;


}



async function logoutAdmin(){

await supabase.auth.signOut();

window.location.href="admin-login.html";

}



function viewUsers(){

window.location.href="admin-users.html";

}


function viewAccounts(){

window.location.href="admin-accounts.html";

}


function viewTransactions(){

window.location.href="admin-transactions.html";

}



loadAdminDashboard();
