async function loadTransactions() {

    const { data: transactions, error } = await supabase
        .from("transactions")
        .select("*")
        .order("transaction_id", { ascending: false });

    if (error) {

        alert(error.message);
        return;

    }

    const table = document.getElementById("transactionsTable");

    table.innerHTML = "";

    transactions.forEach(transaction => {

        const amount = Number(transaction.amount || 0).toLocaleString();

        table.innerHTML += `

        <tr>

            <td>${transaction.transaction_id}</td>

            <td>${transaction.account_id}</td>

            <td>${transaction.transaction_type}</td>

            <td>₦${amount}</td>

            <td>${transaction.status}</td>

            <td>${transaction.transaction_date}</td>

        </tr>

        `;

    });

}



function searchTransactions() {

    const input = document
        .getElementById("searchTransaction")
        .value
        .toLowerCase();

    const rows = document.querySelectorAll("#transactionsTable tr");

    rows.forEach(row => {

        row.style.display = row.innerText
            .toLowerCase()
            .includes(input)
            ? ""
            : "none";

    });

}



document.addEventListener("DOMContentLoaded", function () {

    loadTransactions();

});
