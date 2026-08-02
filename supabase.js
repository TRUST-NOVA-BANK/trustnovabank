/* =====================================
   TRUSTNOVA BANK
   SUPABASE CONFIGURATION
===================================== */

const SUPABASE_URL =
    "https://uiltkhacgipmjrlgsnvb.supabase.co";

const SUPABASE_ANON_KEY =
    "sb_publishable_FUPiaEMQmlO0X7CtZlZU-Q_PjCC3mGD";


/* =====================================
   CREATE SUPABASE CLIENT
===================================== */

const supabase =
    window.supabase.createClient(
        SUPABASE_URL,
        SUPABASE_ANON_KEY
    );


/* =====================================
   GET CURRENT USER
===================================== */

async function getCurrentUser() {

    const {
        data,
        error
    } = await supabase.auth.getUser();

    if (error) {
        console.error(
            "Get current user error:",
            error
        );

        return null;
    }

    return data.user || null;
}


/* =====================================
   LOGOUT
===================================== */

async function logout() {

    const { error } =
        await supabase.auth.signOut();

    if (error) {
        console.error(
            "Logout error:",
            error
        );
    }

    localStorage.removeItem("user");
    localStorage.removeItem("admin");

    window.location.href =
        "login.html";
}


/* =====================================
   SAVE USER SESSION
===================================== */

async function saveUserSession() {

    const user =
        await getCurrentUser();

    if (user) {

        localStorage.setItem(
            "user",
            JSON.stringify(user)
        );

    }
}


/* =====================================
   REQUIRE LOGIN
===================================== */

async function requireLogin() {

    const user =
        await getCurrentUser();

    if (!user) {

        window.location.href =
            "login.html";

        return false;
    }

    return true;
}


/* =====================================
   REQUIRE ADMIN
===================================== */

async function requireAdmin() {

    const user =
        await getCurrentUser();

    if (!user) {

        window.location.href =
            "login.html";

        return false;
    }

    const {
        data: admin,
        error
    } = await supabase
        .from("admins")
        .select("*")
        .eq("user_id", user.id)
        .maybeSingle();

    if (error) {

        console.error(
            "Admin lookup error:",
            error
        );

        window.location.href =
            "dashboard.html";

        return false;
    }

    if (!admin) {

        window.location.href =
            "dashboard.html";

        return false;
    }

    localStorage.setItem(
        "admin",
        JSON.stringify(admin)
    );

    return true;
}
