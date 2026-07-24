/* =====================================
   TRUSTNOVA BANK
   ADMIN USER MANAGEMENT
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


checkAdmin();

loadUsers();



const search =
document.getElementById(
"searchUser"
);



search.addEventListener(
"keyup",
searchUsers
);



});






let usersData = [];






/* ===============================
   ADMIN CHECK
================================ */


function checkAdmin(){


const admin =
JSON.parse(
localStorage.getItem("admin")
);



if(!admin){


window.location.href =
"login.html";


}


}









/* ===============================
   LOAD USERS
================================ */


async function loadUsers(){


try{



const {data:users,error}
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


console.error(
error.message
);



document.getElementById(
"usersTable"
)
.innerHTML =


`

<tr>

<td colspan="6">

${error.message}

</td>

</tr>


`;



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

<td colspan="6">

No users found

</td>

</tr>


`;


return;


}







users.forEach(
user=>{


const statusClass =
user.status === "Active"
?
"active-status"
:
"inactive-status";





table.innerHTML +=


`

<tr>


<td>

${user.user_id}

</td>



<td>

${user.first_name || ""}
${user.last_name || ""}

</td>



<td>

${user.email}

</td>



<td>

${user.phone || "N/A"}

</td>




<td class="${statusClass}">

${user.status}

</td>




<td>


<button

class="action-btn"

onclick="toggleUserStatus(
'${user.user_id}',
'${user.status}'
)"

>

${user.status === "Active"
?
"Deactivate"
:
"Activate"}

</button>


</td>



</tr>


`;



});



}








/* ===============================
   CHANGE USER STATUS
================================ */


async function toggleUserStatus(
id,
status
){



const newStatus =
status === "Active"
?
"Inactive"
:
"Active";





const {error}
=
await supabase
.from("users")
.update({

status:newStatus

})
.eq(
"user_id",
id
);





if(error){


alert(
error.message
);


return;


}




loadUsers();



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


const name =

(
user.first_name +
" " +
user.last_name
)
.toLowerCase();




const email =

(
user.email ||
""
)
.toLowerCase();




return (

name.includes(value)

||

email.includes(value)

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
