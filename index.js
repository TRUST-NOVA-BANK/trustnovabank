document
.getElementById("homeLoginForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const email =
    document.getElementById("loginEmail").value;

    const password =
    document.getElementById("loginPassword").value;


    const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("email", email)
        .eq("password_hash", password)
        .single();


    if (error || !data) {

        alert("Invalid email or password.");

        return;

    }


    localStorage.setItem(
        "user",
        JSON.stringify(data)
    );


    alert("Login Successful!");

    window.location.href = "dashboard.html";

});
