/* ===========================================
   TRUSTNOVA BANK
   SCRIPT.JS
=========================================== */


/* =========================
   LOGIN FORM VALIDATION
========================= */

const loginForm = document.querySelector(".login-box form");

if(loginForm){

    loginForm.addEventListener("submit", function(event){

        event.preventDefault();

        const username = loginForm.querySelector(
            "input[type='text']"
        ).value;

        const password = loginForm.querySelector(
            "input[type='password']"
        ).value;


        if(username === "" || password === ""){

            alert("Please fill in all fields.");

        }else{

            alert("Login successful. Welcome to TrustNova Bank!");

            // Later we will connect this to a real database
            // and redirect to dashboard.html

        }

    });

}


/* =========================
   PASSWORD VISIBILITY
========================= */

const passwordInput = document.querySelector(
"input[type='password']"
);


if(passwordInput){

    passwordInput.addEventListener(
        "dblclick",
        function(){

            if(passwordInput.type === "password"){

                passwordInput.type = "text";

            }else{

                passwordInput.type = "password";

            }

        }
    );

}


/* =========================
   BUTTON ANIMATION
========================= */

const buttons = document.querySelectorAll(
"button, .primary-btn, .secondary-btn, .login-btn"
);


buttons.forEach(function(button){

    button.addEventListener("click", function(){

        button.style.transform="scale(.96)";

        setTimeout(function(){

            button.style.transform="";

        },150);

    });

});


/* =========================
   YEAR UPDATE
========================= */

const year = document.querySelector(
"footer p:last-child"
);


if(year){

    const currentYear = new Date().getFullYear();

    year.innerHTML =
    `&copy; ${currentYear} TrustNova Bank. All Rights Reserved.`;

}





async function registerUser() {

  const full_name = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;
  const password = document.getElementById("password").value;

  const { data, error } = await supabase
    .from("users")
    .insert([
      {
        full_name: full_name,
        email: email,
        phone: phone,
        password: password
      }
    ]);

  if (error) {
    alert(error.message);
  } else {
    alert("Registration successful!");
  }

}





