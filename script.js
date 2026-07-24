/* ===========================================
   TRUSTNOVA BANK
   script.js
=========================================== */

document.addEventListener("DOMContentLoaded", () => {

    /* =========================
       PASSWORD VISIBILITY
    ========================= */

    const passwordInput = document.querySelector("input[type='password']");

    if (passwordInput) {

        passwordInput.addEventListener("dblclick", () => {

            passwordInput.type =
                passwordInput.type === "password"
                    ? "text"
                    : "password";

        });

    }

    /* =========================
       BUTTON ANIMATION
    ========================= */

    const buttons = document.querySelectorAll(
        "button, .primary-btn, .secondary-btn, .login-btn"
    );

    buttons.forEach(button => {

        button.addEventListener("click", () => {

            button.style.transform = "scale(0.96)";

            setTimeout(() => {

                button.style.transform = "";

            }, 150);

        });

    });

    /* =========================
       FOOTER YEAR
    ========================= */

    const footer = document.querySelector("footer p:last-child");

    if (footer) {

        footer.innerHTML =
            `&copy; ${new Date().getFullYear()} TrustNova Bank. All Rights Reserved.`;

    }

});
