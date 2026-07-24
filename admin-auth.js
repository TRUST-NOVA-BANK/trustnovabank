alert("Admin auth connected");

document
.getElementById("adminLoginForm")
.addEventListener("submit", async function(e){

e.preventDefault();

const email = document.getElementById("admin_email").value;
const password = document.getElementById("admin_password").value;


// Check admin table
const { data: admin, error } = await supabase
.from("admins")
.select("*")
.eq("email", email)
.eq("password_hash", password)
.single();


if(error){

    alert("Invalid admin login");

} else {

    alert("Admin login successful!");

    window.location.href = "admin-dashboard.html";

}

});



