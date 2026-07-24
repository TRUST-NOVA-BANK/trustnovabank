alert("Admin auth connected");

document
.getElementById("adminLoginForm")
.addEventListener("submit", async function(e) {

    e.preventDefault();

    const email = document.getElementById("admin_email").value;
    const password = document.getElementById("admin_password").value;

    console.log("Trying login:", email);


    const { data: admin, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .eq("password_hash", password)
        .single();


    console.log(admin);
    console.log(error);


    if (error) {

        alert(error.message);

    } else {

        alert("Admin login successful!");

        window.location.href = "admin-dashboard.html";

    }

});
