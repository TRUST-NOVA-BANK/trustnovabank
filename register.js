/* =====================================
   TRUSTNOVA BANK
   CUSTOMER REGISTRATION
   SUPABASE AUTH + CUSTOMER PROFILE
===================================== */

document.addEventListener("DOMContentLoaded", () => {

    const registerForm = document.getElementById("registerForm");

    if (!registerForm) {
        console.error("registerForm was not found.");
        return;
    }


    registerForm.addEventListener("submit", async (event) => {

        event.preventDefault();


        /* =====================================
           GET FORM VALUES
        ===================================== */

        const firstNameElement =
            document.getElementById("first_name");

        const lastNameElement =
            document.getElementById("last_name");

        const emailElement =
            document.getElementById("email");

        const phoneElement =
            document.getElementById("phone");

        const passwordElement =
            document.getElementById("password");


        if (
            !firstNameElement ||
            !lastNameElement ||
            !emailElement ||
            !phoneElement ||
            !passwordElement
        ) {
            alert("Registration form fields are missing.");
            return;
        }


        const first_name =
            firstNameElement.value.trim();

        const last_name =
            lastNameElement.value.trim();

        const email =
            emailElement.value.trim().toLowerCase();

        const phone =
            phoneElement.value.trim();

        const password =
            passwordElement.value;


        /* =====================================
           VALIDATION
        ===================================== */

        if (
            !first_name ||
            !last_name ||
            !email ||
            !phone ||
            !password
        ) {
            alert("Please complete all required fields.");
            return;
        }


        if (password.length < 6) {
            alert(
                "Password must contain at least 6 characters."
            );
            return;
        }


        /* =====================================
           DISABLE SUBMIT BUTTON
        ===================================== */

        const submitButton =
            registerForm.querySelector(
                'button[type="submit"], input[type="submit"]'
            );

        if (submitButton) {
            submitButton.disabled = true;
        }


        try {

            /* =====================================
               1. CREATE SUPABASE AUTH USER

               Password is handled by Supabase Auth.
               It is NOT stored in public.users.
            ===================================== */

            const {
                data: authData,
                error: authError
            } = await supabase.auth.signUp({

                email: email,

                password: password

            });


            if (authError) {

                console.error(
                    "Supabase Auth error:",
                    authError
                );

                alert(
                    authError.message
                );

                return;
            }


            const authUser =
                authData?.user;


            if (!authUser) {

                alert(
                    "Registration could not be completed."
                );

                return;
            }


            /* =====================================
               2. CHECK WHETHER AUTH USER ALREADY
                  HAS A CUSTOMER PROFILE
            ===================================== */

            const {
                data: existingProfile,
                error: existingProfileError
            } = await supabase
                .from("users")
                .select("user_id")
                .eq("auth_user_id", authUser.id)
                .maybeSingle();


            if (existingProfileError) {

                console.error(
                    "Profile lookup error:",
                    existingProfileError
                );

                alert(
                    "The authentication account was created, but the customer profile could not be checked."
                );

                return;
            }


            /* =====================================
               3. CREATE CUSTOMER PROFILE

               user_id is NOT supplied.

               PostgreSQL automatically generates
               users.user_id using users_user_id_seq.

               auth_user_id stores auth.users.id.
            ===================================== */

            if (!existingProfile) {

                const {
                    data: profile,
                    error: profileError
                } = await supabase
                    .from("users")
                    .insert([{

                        auth_user_id:
                            authUser.id,

                        first_name:
                            first_name,

                        last_name:
                            last_name,

                        email:
                            email,

                        phone:
                            phone,

                        status:
                            "Active",

                        created_at:
                            new Date().toISOString()

                    }])
                    .select("user_id")
                    .single();


                if (profileError) {

                    console.error(
                        "Customer profile error:",
                        profileError
                    );

                    alert(
                        "Your login account was created, but the customer profile could not be created. Please contact the administrator."
                    );

                    return;
                }


                console.log(
                    "Customer profile created:",
                    profile
                );

            }


            /* =====================================
               4. DO NOT CREATE ACCOUNTS YET

               accounts.user_id requires the integer
               public.users.user_id.

               accounts.status is SMALLINT and has
               no default/check constraint.

               Therefore we intentionally leave
               account creation out until the
               application's account-status values
               are defined.
            ===================================== */


            /* =====================================
               5. SAVE BASIC AUTH USER REFERENCE

               Do not store the password.
            ===================================== */

            localStorage.setItem(
                "user",
                JSON.stringify({
                    id: authUser.id,
                    email: authUser.email
                })
            );


            /* =====================================
               6. EMAIL CONFIRMATION HANDLING

               If email confirmation is enabled,
               Supabase may return a user without
               an active session.
            ===================================== */

            if (!authData.session) {

                alert(
                    "Registration successful. Please check your email and confirm your account before signing in."
                );

                window.location.href =
                    "login.html";

                return;
            }


            /* =====================================
               7. REGISTRATION COMPLETE
            ===================================== */

            alert(
                "Registration successful!"
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

        finally {

            if (submitButton) {
                submitButton.disabled = false;
            }

        }

    });

});
