alert("Admin auth connected");

const loginForm = document.getElementById("adminLoginForm");

if (loginForm) {

    loginForm.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("admin_email").value.trim();
        const password = document.getElementById("admin_password").value;

        const { data: admin, error } = await supabase
            .from("admins")
            .select("*")
            .eq("email", email)
            .eq("password_hash", password)
            .single();

        if (error || !admin) {

            console.log(error);
            alert("Invalid email or password.");

            return;
        }

        localStorage.setItem("admin", JSON.stringify(admin));

        alert("Admin login successful!");

        window.location.href = "admin-dashboard.html";

    });

}
