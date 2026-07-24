async function loadAdminDashboard() {

    try {

        const { count: usersCount, error: usersError } = await supabase
            .from("users")
            .select("*", { count: "exact", head: true });

        if (usersError) throw usersError;


        const { count: accountsCount, error: accountsError } = await supabase
            .from("accounts")
            .select("*", { count: "exact", head: true });

        if (accountsError) throw accountsError;


        const { count: transactionsCount, error: transactionsError } = await supabase
            .from("transactions")
            .select("*", { count: "exact", head: true });

        if (transactionsError) throw transactionsError;


        const { count: ticketsCount, error: ticketsError } = await supabase
            .from("support_tickets")
            .select("*", { count: "exact", head: true });

        if (ticketsError) throw ticketsError;


        document.getElementById("total_users").textContent = usersCount ?? 0;
        document.getElementById("total_accounts").textContent = accountsCount ?? 0;
        document.getElementById("total_transactions").textContent = transactionsCount ?? 0;
        document.getElementById("total_tickets").textContent = ticketsCount ?? 0;

    } catch (error) {

        console.error(error);
        alert(error.message);

    }

}


// Display admin name
const admin = JSON.parse(localStorage.getItem("admin"));

if (admin) {

    document.querySelector(".dashboard-header p").textContent =
        "Welcome, " + admin.full_name;

}


// Navigation
function viewUsers() {

    window.location.href = "admin-users.html";

}

function viewAccounts() {

    window.location.href = "admin-accounts.html";

}

function viewTransactions() {

    window.location.href = "admin-transactions.html";

}


// Logout
async function logoutAdmin() {

    localStorage.removeItem("admin");

    await supabase.auth.signOut();

    window.location.href = "admin-login.html";

}


// Load dashboard
document.addEventListener("DOMContentLoaded", function () {

    loadAdminDashboard();

});
