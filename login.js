// TrustNova Bank Login

document.addEventListener("DOMContentLoaded", function () {

    const form = document.getElementById("loginForm");

    form.addEventListener("submit", async function (e) {

        e.preventDefault();

        const email = document.getElementById("email").value.trim();

        const password = document.getElementById("password").value;

        const remember =
            document.querySelector(".remember input[type='checkbox']").checked;

        // Search user
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("password_hash", password)
            .single();

        if (error || !user) {

            alert("Invalid email or password.");

            console.log(error);

            return;

        }

        // Check account status
        if (user.status !== "Active") {

            alert("Your account is inactive. Please contact support.");

            return;

        }

        // Save logged-in user
        localStorage.setItem("user", JSON.stringify(user));

        // Remember Me
        if (remember) {

            localStorage.setItem("rememberEmail", email);

        } else {

            localStorage.removeItem("rememberEmail");

        }

        alert("Login Successful!");

        window.location.href = "dashboard.html";

    });

    // Auto-fill remembered email
    const rememberedEmail = localStorage.getItem("rememberEmail");

    if (rememberedEmail) {

        document.getElementById("email").value = rememberedEmail;

        document.querySelector(".remember input[type='checkbox']").checked = true;

    }

});
