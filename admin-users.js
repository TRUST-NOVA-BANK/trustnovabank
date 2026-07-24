async function loadUsers() {

    const { data: users, error } = await supabase
        .from("users")
        .select("*")
        .order("user_id");

    if (error) {
        alert(error.message);
        return;
    }

    const table = document.getElementById("usersTable");

    table.innerHTML = "";

    users.forEach(user => {

        table.innerHTML += `

        <tr>

        <td>${user.user_id}</td>

        <td>${user.first_name} ${user.last_name}</td>

        <td>${user.email}</td>

        <td>${user.phone}</td>

        <td>${user.status}</td>

        <td>

        <button onclick="toggleStatus(${user.user_id}, '${user.status}')">

        ${user.status === "Active" ? "Deactivate" : "Activate"}

        </button>

        </td>

        </tr>

        `;

    });

}



async function toggleStatus(id, status){

    const newStatus =
    status === "Active"
    ? "Inactive"
    : "Active";


    const { error } = await supabase
        .from("users")
        .update({ status:newStatus })
        .eq("user_id",id);

    if(error){

        alert(error.message);

    }else{

        loadUsers();

    }

}



function searchUsers(){

    let input =
    document.getElementById("searchUser").value.toLowerCase();

    let rows =
    document.querySelectorAll("#usersTable tr");

    rows.forEach(row=>{

        row.style.display =
        row.innerText.toLowerCase().includes(input)
        ? ""
        : "none";

    });

}

loadUsers();
