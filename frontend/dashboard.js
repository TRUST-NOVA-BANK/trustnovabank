// =================================
// TRUSTNOVA BANK DASHBOARD SCRIPT
// =================================


const userId = localStorage.getItem("user_id");


// Check if user is logged in

if(!userId){

    window.location.href = "login.html";

}



// Load dashboard data

async function loadDashboard(){


    try{


        const response = await fetch(

            `http://127.0.0.1:5000/dashboard/${userId}`

        );


        const data = await response.json();



        if(response.ok){


            document.getElementById("customerName").textContent =
            data.name;



            document.getElementById("accountNumber").textContent =
            data.account_number;



            document.getElementById("accountType").textContent =
            data.account_type;



            document.getElementById("balance").textContent =
            Number(data.balance).toFixed(2);



        }

        else{

            alert(data.message);

        }



    }

    catch(error){

        console.log(error);

        alert("Unable to connect to server");

    }


}

async function loadDashboard() {

    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
        window.location.href = "login.html";
        return;
    }


    const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .eq("user_id", user.id)
        .single();


    if (error) {

        console.log(error.message);

    } else {

        document.getElementById("balance").innerHTML =
        data.balance;

        document.getElementById("account_number").innerHTML =
        data.account_number;

        document.getElementById("account_type").innerHTML =
        data.account_type;

    }

}


async function logoutUser(){

    await supabase.auth.signOut();

    window.location.href = "login.html";

}

loadDashboard();
