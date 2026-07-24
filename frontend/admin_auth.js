document
.getElementById("adminLoginForm")
.addEventListener("submit", async function(e){

e.preventDefault();


const email = document.getElementById("admin_email").value;
const password = document.getElementById("admin_password").value;


// Login with Supabase Auth
const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password
});


if(error){
    alert(error.message);
    return;
}


// Check admin table
const { data: admin, error: adminError } = await supabase
.from("admins")
.select("*")
.eq("user_id", data.user.id)
.single();


if(adminError){

    alert("Access denied. Not an admin.");

    await supabase.auth.signOut();

} else {

    alert("Admin login successful!");

    window.location.href = "admin-dashboard.html";

}

});
