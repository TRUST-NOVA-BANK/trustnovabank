/* =====================================
   TRUSTNOVA BANK
   ADMIN CUSTOMER MANAGEMENT
===================================== */


document.addEventListener(
"DOMContentLoaded",
async function(){


    const allowed =
    await checkAdmin();



    if(!allowed){

        return;

    }



    await loadUsers();





    document
    .getElementById("searchUser")
    .addEventListener(
        "keyup",
        searchUsers
    );


});







let usersData = [];








/* ===============================
   ADMIN SECURITY
================================ */


async function checkAdmin(){


const {

data:userData,

error

}
=
await supabase.auth.getUser();





if(error || !userData.user){


window.location.href =
"login.html";


return false;


}






const {

data:admin

}
=
await supabase

.from("admins")

.select("*")

.eq(

"user_id",

userData.user.id

)

.single();






if(!admin){


window.location.href =
"dashboard.html";


return false;


}



return true;


}









/* ===============================
   LOAD USERS
================================ */


async function loadUsers(){


try{


const {

data:users,

error

}
=
await supabase

.from("users")

.select("*")

.order(

"created_at",

{

ascending:false

}

);





if(error){

throw error;

}



usersData =
users || [];



displayUsers(
usersData
);



}

catch(error){


console.error(error);


}


}









/* ===============================
   DISPLAY USERS
================================ */


function displayUsers(users){



const table =
document.getElementById(
"usersTable"
);




table.innerHTML="";





if(users.length===0){


table.innerHTML =

`

<tr>

<td colspan="5">

No customers found

</td>

</tr>

`;

return;


}







users.forEach(
user=>{


table.innerHTML +=

`

<tr>


<td>

${user.first_name}
${user.last_name}

</td>


<td>

${user.email}

</td>


<td>

${user.phone || "-"}

</td>


<td>

<span class="status">

${user.status}

</span>

</td>


<td>

${new Date(
user.created_at
)
.toLocaleDateString(
"en-US"
)}

</td>


</tr>

`;



});


}









/* ===============================
   SEARCH USERS
================================ */


function searchUsers(){



const value =
document

.getElementById(
"searchUser"
)

.value

.toLowerCase();





const filtered =
usersData.filter(
user=>{


return (

user.first_name
+
" "
+
user.last_name
+
" "
+
user.email

)

.toLowerCase()

.includes(
value
);


});





displayUsers(
filtered
);



}









/* ===============================
   LOGOUT
================================ */


async function logout(){


await supabase.auth.signOut();


localStorage.removeItem(
"admin"
);


window.location.href =
"login.html";


}
