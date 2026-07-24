
// ===============================
// TrustNova Bank - Profile Page
// ===============================

// Check if user is logged in
const user = JSON.parse(localStorage.getItem("user"));

if (!user) {

    window.location.href = "login.html";

}


// Display user information
document.getElementById("fullName").textContent =
    `${user.first_name || ""} ${user.last_name || ""}`.trim();

document.getElementById("email").textContent =
    user.email || "Not Available";

document.getElementById("phone").textContent =
    user.phone || "Not Available";

document.getElementById("nationality").textContent =
    user.nationality || "Not Available";

document.getElementById("sex").textContent =
    user.sex || "Not Available";

document.getElementById("dob").textContent =
    user.dob || user.date_of_birth || "Not Available";

document.getElementById("status").textContent =
    user.status || "Active";


// Load profile photo
if (user.photo_url && user.photo_url !== "") {

    document.getElementById("profilePhoto").src =
        user.photo_url;

}


// Load account information
loadAccount();


async function loadAccount() {

    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.user_id)
        .single();

    if (error) {

        console.log(error);

        document.getElementById("accountNumber").textContent =
            "Not Available";

        document.getElementById("accountType").textContent =
            "Not Available";

        return;

    }

    document.getElementById("accountNumber").textContent =
        data.account_number;

    document.getElementById("accountType").textContent =
        data.account_type;

}


// Logout
function logout() {

    localStorage.removeItem("user");

    window.location.href = "login.html";

}
