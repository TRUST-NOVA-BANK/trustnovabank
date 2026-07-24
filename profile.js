/* =====================================
   TRUSTNOVA BANK
   PROFILE SYSTEM
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


loadProfile();


});





/* ===============================
   LOAD PROFILE
================================ */


async function loadProfile(){



const user =
JSON.parse(
localStorage.getItem("user")
);



if(!user){


window.location.href =
"login.html";


return;


}




try{



/* LOAD USER DATA */


const {data:userData,error:userError}
=
await supabase
.from("users")
.select("*")
.eq(
"user_id",
user.id
)
.single();




if(userError){

throw userError;

}





document.getElementById(
"full_name"
)
.textContent =

userData.first_name
+
" "
+
userData.last_name;





document.getElementById(
"email"
)
.textContent =

userData.email;





document.getElementById(
"phone"
)
.textContent =

userData.phone ||
"N/A";





if(userData.profile_photo){


document.getElementById(
"profile_photo"
)
.src =
userData.profile_photo;


}






/* LOAD ACCOUNT DATA */


const {data:account,error:accountError}
=
await supabase
.from("accounts")
.select("*")
.eq(
"user_id",
user.id
)
.single();





if(accountError){

throw accountError;

}





document.getElementById(
"account_number"
)
.textContent =

"**** **** **** "
+
account.account_number.slice(-4);







document.getElementById(
"account_type"
)
.textContent =

account.account_type ||
"Checking Account";







document.getElementById(
"account_status"
)
.textContent =

account.status;






}

catch(error){


console.error(error);


alert(
"Unable to load profile: "
+
error.message
);


}



}






/* ===============================
   LOGOUT
================================ */


async function logout(){


await supabase.auth.signOut();


localStorage.removeItem(
"user"
);



window.location.href =
"login.html";


}
