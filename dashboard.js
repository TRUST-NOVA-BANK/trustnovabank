// Get the logged-in user
const user = JSON.parse(localStorage.getItem("user"));

// If no user is logged in, return to home page
if (!user) {

    window.location.href = "index.html";

}

// Display user information
document.getElementById("user_name").textContent =
    `${user.first_name} ${user.last_name}`;

document.getElementById("user_email").textContent =
    user.email;

document.getElementById("user_nationality").textContent =
    "Nationality: " + (user.nationality || "Not Set");

document.getElementById("user_status").textContent =
    "Status: " + (user.status || "Active");

// Display profile photo if available
if (user.photo_url) {

    document.getElementById("user_photo").src = user.photo_url;

}

// Logout function
function logout() {

    localStorage.removeItem("user");

    window.location.href = "index.html";

}
