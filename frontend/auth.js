const registerForm = document.getElementById("registerForm");

if (registerForm) {

    registerForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const userData = {

            full_name: document.getElementById("fullname").value,

            email: document.getElementById("email").value,

            phone: document.getElementById("phone").value,

            password: document.getElementById("password").value

        };


        const response = await fetch(
            "http://127.0.0.1:5000/register",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(userData)
            }
        );


        const result = await response.json();


        if (result.success) {

            alert(
                "Account created. Your account number is: "
                + result.account_number
            );

            window.location.href = "login.html";

        } 
        
        else {

            alert(result.error);

        }


    });

}

const loginForm = document.getElementById("loginForm");


if (loginForm) {

    loginForm.addEventListener("submit", async (e) => {

        e.preventDefault();


        const loginData = {

            email: document.getElementById("email").value,

            password: document.getElementById("password").value

        };


        const response = await fetch(

            "http://127.0.0.1:5000/login",

            {

                method: "POST",

                headers: {

                    "Content-Type": "application/json"

                },

                body: JSON.stringify(loginData)

            }

        );


        const result = await response.json();


        if (result.success) {


            localStorage.setItem(
                "user_id",
                result.user_id
            );


            window.location.href = "dashboard.html";


        } else {


            alert(result.message);


        }


    });

}