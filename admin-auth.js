document.addEventListener("DOMContentLoaded", () => {

    alert("Admin auth connected");

    const form = document.getElementById("adminLoginForm");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("admin_email").value;
        const password = document.getElementById("admin_password").value;

        const { data: admin, error } = await supabase
            .from("admins")
            .select("*")
            .eq("email", email)
            .eq("password_hash", password)
            .single();

        if (error || !admin) {
            alert("Invalid email or password");
            return;
        }

        alert("Login successful!");

        window.location.href = "admin-dashboard.html";

    });

});
