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

        alert(error.message);
        console.error(error);

    }

}

function viewUsers() {

    window.location.href = "admin-users.html";

}

function viewAccounts() {

    window.location.href = "admin-accounts.html";

}

function viewTransactions() {

    window.location.href = "admin-transactions.html";

}

async function logoutAdmin() {

    await supabase.auth.signOut();

    window.location.href = "admin-login.html";

}


