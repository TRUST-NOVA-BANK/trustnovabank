/* =====================================
   TRUSTNOVA BANK
   CUSTOMER REGISTRATION SYSTEM
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) {
        return;
    }

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();

        const first_name =
            document.getElementById("first_name")?.value.trim();

        const last_name =
            document.getElementById("last_name")?.value.trim();

        const email =
            document.getElementById("email")?.value.trim();

        const phone =
            document.getElementById("phone")?.value.trim();

        const password =
            document.getElementById("password")?.value;

        if (!first_name || !last_name || !email || !phone || !password) {
            alert("Please complete all required fields.");
            return;
        }

        try {

            /* =====================================
               1. CREATE SUPABASE AUTH USER
            ===================================== */

            const {
                data: authData,
                error: authError
            } = await supabase.auth.signUp({
                email: email,
                password: password
            });

            if (authError) {
                console.error("Auth registration error:", authError);
                alert(authError.message);
                return;
            }

            const authUser = authData?.user;

            if (!authUser) {
                alert("Registration could not be completed.");
                return;
            }


            /* =====================================
               2. CREATE CUSTOMER PROFILE
            ===================================== */

            const {
                data: profile,
                error: profileError
            } = await supabase
                .from("users")
                .insert([{
                    auth_user_id: authUser.id,
                    first_name: first_name,
                    last_name: last_name,
                    email: email,
                    phone: phone,
                    status: "Active",
                    created_at: new Date().toISOString()
                }])
                .select("user_id")
                .single();

            if (profileError) {

                console.error(
                    "Profile creation error:",
                    profileError
                );

                alert(
                    "Your authentication account was created, but your customer profile could not be created: " +
                    profileError.message
                );

                return;
            }


            /* =====================================
               3. CREATE CUSTOMER BANK ACCOUNT
            ===================================== */

            const accountNumber =
                generateAccountNumber();

            const {
                error: accountError
            } = await supabase
                .from("accounts")
                .insert([{
                    user_id: profile.user_id,
                    account_number: accountNumber,
                    account_type: "Checking",
                    balance: 0.00,
                    currency: "USD",

                    /*
                       accounts.status is SMALLINT.
                       Use the numeric value expected
                       by your database, not "Active".
                    */
                    status: 1,

                    created_at: new Date().toISOString()
                }]);

            if (accountError) {

                console.error(
                    "Account creation error:",
                    accountError
                );

                alert(
                    "Your profile was created, but the bank account could not be created: " +
                    accountError.message
                );

                return;
            }


            /* =====================================
               4. SAVE SESSION
            ===================================== */

            localStorage.setItem(
                "user",
                JSON.stringify(authUser)
            );


            /* =====================================
               5. SUCCESS
            ===================================== */

            alert(
                "Registration successful! Your account has been created."
            );

            window.location.href =
                "dashboard.html";

        }

        catch (error) {

            console.error(
                "Unexpected registration error:",
                error
            );

            alert(
                "Registration failed. Please try again."
            );
        }

    });

});


/* =====================================
   ACCOUNT NUMBER GENERATOR
===================================== */

function generateAccountNumber() {

    const random =
        Math.floor(
            Math.random() * 9000000000
        ) + 1000000000;

    return String(random);
}
