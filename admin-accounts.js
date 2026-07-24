async function loadAccounts() {

    const { data: accounts, error } = await supabase
        .from("accounts")
        .select("*")
        .order("account_id");

    if (error) {
        alert(error.message);
        return;
    }

    const table = document.getElementById("accountsTable");

    table.innerHTML = "";

    accounts.forEach(account => {

        table.innerHTML += `

        <tr>

        <td>${account.account_id}</td>

        <td>${account.user_id}</td>

        <td>${account.account_number}</td>

        <td>${account.account_type}</td>

        <td>₦${Number(account.balance).toLocaleString()}</td>

        <td>${account.status}</td>

        <td>

        <button onclick="toggleAccountStatus(${account.account_id}, '${account.status}')">

        ${account.status === "Active" ? "Deactivate" : "Activate"}

        </button>

        </td>

        </tr>

        `;

    });

}

async function toggleAccountStatus(accountId, status) {

    const newStatus = status === "Active"
        ? "Inactive"
        : "Active";

    const { error } = await supabase
        .from("accounts")
        .update({ status: newStatus })
        .eq("account_id", accountId);

    if (error) {

        alert(error.message);

    } else {

        loadAccounts();

    }

}

function searchAccounts() {

    const input = document.getElementById("searchAccount").value.toLowerCase();

    const rows = document.querySelectorAll("#accountsTable tr");

    rows.forEach(row => {

        row.style.display =
            row.innerText.toLowerCase().includes(input)
                ? ""
                : "none";

    });

}

loadAccounts();
