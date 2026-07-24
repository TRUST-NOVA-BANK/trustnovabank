alert("Admin auth connected");

document
.getElementById("adminLoginForm")
.addEventListener("submit", async function(e){

    e.preventDefault();

    const email = document.getElementById("admin_email").value;
    const password = document.getElementById("admin_password").value;


    const { data: admin, error } = await supabase
        .from("admins")
        .select("*")
        .eq("email", email)
        .eq("password_hash", password)
        .single();


    if(error || !admin){

        alert("Invalid admin login");

        console.log(error);

    } else {

        alert("Admin login successful!");

        localStorage.setItem(
            "admin",
            JSON.stringify(admin)
        );

        window.location.href = "admin-dashboard.html";

    }

});
