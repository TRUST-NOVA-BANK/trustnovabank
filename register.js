// ===============================
// TrustNova Bank - Register User
// ===============================

document
.getElementById("registerForm")
.addEventListener("submit", async function (e) {

    e.preventDefault();

    const firstName =
        document.getElementById("first_name").value.trim();

    const lastName =
        document.getElementById("last_name").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const password =
        document.getElementById("password").value;


    // Check if email already exists
    const { data: existingUser } = await supabase
        .from("users")
        .select("user_id")
        .eq("email", email)
        .maybeSingle();

    if (existingUser) {

        alert("An account with this email already exists.");

        return;

    }


    // Generate a unique 9-digit User ID
    const userId =
        Math.floor(100000000 + Math.random() * 900000000);

    // Generate a unique 10-digit Account Number
    const accountNumber =
        Math.floor(1000000000 + Math.random() * 9000000000).toString();


    // Create user
    const { error: userError } = await supabase
        .from("users")
        .insert({

            user_id: userId,

            first_name: firstName,

            last_name: lastName,

            email: email,

            phone: phone,

            password_hash: password,

            status: "Active"

        });

    if (userError) {

        alert(userError.message);

        console.log(userError);

        return;

    }


    // Create bank account
    const { error: accountError } = await supabase
        .from("accounts")
        .insert({

            user_id: userId,

            account_number: accountNumber,

            account_type: "Savings",

            balance: 0,

            status: "Active"

        });

    if (accountError) {

        alert(accountError.message);

        console.log(accountError);

        return;

    }


    alert("Account created successfully!");

    window.location.href = "login.html";

});
