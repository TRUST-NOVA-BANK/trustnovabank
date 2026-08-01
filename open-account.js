/* =====================================
   TRUSTNOVA BANK
   OPEN BANK ACCOUNT
===================================== */

document.addEventListener("DOMContentLoaded", () => {
const SUPABASE_URL =
    "https://uiltkhacgipmjrlgsnvb.supabase.co";
    const form =
        document.getElementById("openAccountForm");

    if (!form) {
        console.error("openAccountForm not found.");
        return;
    }


    form.addEventListener("submit", async (event) => {

        event.preventDefault();


        try {

            /* =====================================
               1. GET CURRENT SUPABASE USER
            ===================================== */

            const {
                data: authData,
                error: authError
            } = await supabase.auth.getUser();


            if (authError || !authData.user) {

                alert(
                    "Please sign in before opening a bank account."
                );

                window.location.href =
                    "login.html";

                return;
            }


            const authUser =
                authData.user;


            /* =====================================
               2. FIND CUSTOMER PROFILE
            ===================================== */

            const {
                data: customer,
                error: customerError
            } = await supabase
                .from("users")
                .select(
                    "user_id, first_name, last_name, email"
                )
                .eq(
                    "auth_user_id",
                    authUser.id
                )
                .single();


            if (customerError || !customer) {

                console.error(
                    "Customer lookup error:",
                    customerError
                );

                alert(
                    "Your customer profile could not be found."
                );

                return;
            }


            /* =====================================
               3. CHECK FOR EXISTING ACCOUNT
            ===================================== */

            const {
                data: existingAccounts,
                error: existingError
            } = await supabase
                .from("accounts")
                .select(
                    "account_id, account_number, account_type"
                )
                .eq(
                    "user_id",
                    customer.user_id
                );


            if (existingError) {

                console.error(
                    "Existing account check failed:",
                    existingError
                );

                alert(
                    "Unable to check your existing accounts."
                );

                return;
            }


            if (
                existingAccounts &&
                existingAccounts.length > 0
            ) {

                alert(
                    "You already have a bank account."
                );

                return;
            }


            /* =====================================
               4. GET ACCOUNT TYPE
            ===================================== */

            const accountTypeElement =
                document.getElementById(
                    "account_type"
                );


            const accountType =
                accountTypeElement
                    ? accountTypeElement.value.trim()
                    : "";


            if (!accountType) {

                alert(
                    "Please select an account type."
                );

                return;
            }


            /* =====================================
               5. CREATE ACCOUNT NUMBER
            ===================================== */

            const accountNumber =
                generateAccountNumber();


            /* =====================================
               6. CREATE ACCOUNT NAME
            ===================================== */

            const accountName =
                `${customer.first_name} ${customer.last_name}`;


            /* =====================================
               7. CREATE BANK ACCOUNT

               status is intentionally omitted
               because the database currently has
               no documented numeric status value.
            ===================================== */

            const {
                data: account,
                error: accountError
            } = await supabase
                .from("accounts")
                .insert([{

                    user_id:
                        customer.user_id,

                    account_number:
                        accountNumber,

                    account_type:
                        accountType,

                    balance:
                        0.00,

                    currency:
                        "USD",

                    account_name:
                        accountName,

                    opened_date:
                        new Date()
                            .toISOString()
                            .split("T")[0]

                }])
                .select()
                .single();


            if (accountError) {

                console.error(
                    "Account creation failed:",
                    accountError
                );

                alert(
                    "Account creation failed: " +
                    accountError.message
                );

                return;
            }


            /* =====================================
               8. SUCCESS
            ===================================== */

            console.log(
                "Account created:",
                account
            );


            alert(
                "Your bank account was created successfully.\n\n" +
                "Account Number: " +
                account.account_number
            );


            window.location.href =
                "dashboard.html";


        }

        catch (error) {

            console.error(
                "Unexpected error:",
                error
            );

            alert(
                "Something went wrong while opening your account."
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
