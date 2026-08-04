 /* =====================================
   TRUSTNOVA BANK
   OPEN BANK ACCOUNT
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const openAccountForm =
        document.getElementById("openAccountForm");

    if (!openAccountForm) {
        return;
    }

    openAccountForm.addEventListener("submit", async (event) => {

        event.preventDefault();

        try {

            /* =====================================
               1. GET AUTHENTICATED USER
            ===================================== */

            const {
                data: authData,
                error: authError
            } = await supabase.auth.getUser();

            if (authError || !authData.user) {
                alert("Please sign in before opening a bank account.");
                window.location.href = "login.html";
                return;
            }

            const authUser = authData.user;


            /* =====================================
               2. FIND CUSTOMER PROFILE
            ===================================== */

            const {
                data: customer,
                error: customerError
            } = await supabase
                .from("users")
                .select("user_id, first_name, last_name, email")
                .eq("auth_user_id", authUser.id)
                .single();

            if (customerError || !customer) {

                console.error(
                    "Customer lookup error:",
                    customerError
                );

                alert(
                    "Customer profile could not be found."
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
                .select("account_id, account_number")
                .eq("user_id", customer.user_id);

            if (existingError) {

                console.error(
                    "Account lookup error:",
                    existingError
                );

                alert(
                    "Unable to check existing accounts."
                );

                return;
            }


            if (existingAccounts && existingAccounts.length > 0) {

                alert(
                    "You already have a bank account."
                );

                return;
            }


            /* =====================================
               4. GET ACCOUNT TYPE
            ===================================== */

            const accountTypeElement =
                document.getElementById("account_type");

            const accountType =
                accountTypeElement
                    ? accountTypeElement.value
                    : "Checking";


            /* =====================================
               5. CREATE ACCOUNT NUMBER
            ===================================== */

            const accountNumber =
                generateAccountNumber();


            /* =====================================
               6. CREATE BANK ACCOUNT
               
               IMPORTANT:
               accounts.status is SMALLINT.

               We are deliberately NOT supplying
               status until your application defines
               its numeric status values.
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
                        0,

                    currency:
                        "USD",

                    account_name:
                        `${customer.first_name} ${customer.last_name}`,

                    opened_date:
                        new Date()
                            .toISOString()
                            .split("T")[0],

                    created_at:
                        new Date().toISOString()

                }])
                .select()
                .single();


            if (accountError) {

                console.error(
                    "Account creation error:",
                    accountError
                );

                alert(
                    "Bank account could not be created: " +
                    accountError.message
                );

                return;
            }


            /* =====================================
               7. SUCCESS
            ===================================== */

            console.log(
                "Bank account created:",
                account
            );

            alert(
                "Your bank account has been created successfully.\n\n" +
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
                "Unable to create the bank account."
            );
        }

    });

});


/* =====================================
   ACCOUNT NUMBER GENERATOR
===================================== */

function generateAccountNumber() {

    const min = 1000000000n;
    const range = 9000000000n; // 10-digit numbers: [1000000000, 9999999999]
    const maxUint64 = (1n << 64n) - 1n;
    const limit = maxUint64 - ((maxUint64 + 1n) % range);

    while (true) {
        const bytes = new Uint8Array(8);
        window.crypto.getRandomValues(bytes);

        let value = 0n;
        for (const byte of bytes) {
            value = (value << 8n) | BigInt(byte);
        }

        if (value <= limit) {
            return String(min + (value % range));
        }
    }

}
