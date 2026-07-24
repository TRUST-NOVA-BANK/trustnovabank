/* =====================================
   TRUSTNOVA BANK
   TRANSFER MONEY SYSTEM
===================================== */


document.addEventListener(
"DOMContentLoaded",
()=>{


const user =
JSON.parse(
localStorage.getItem("user")
);



if(!user){

window.location.href="login.html";

return;

}



const form =
document.getElementById(
"transferForm"
);



form.addEventListener(
"submit",
async(e)=>{


e.preventDefault();



const recipientAccount =
document
.getElementById(
"recipient_account"
)
.value
.trim();



const amount =
Number(
document
.getElementById(
"amount"
)
.value
);



const description =
document
.getElementById(
"description"
)
.value
.trim();




const message =
document.getElementById(
"message"
);





if(amount <= 0){

showMessage(
"Enter a valid amount",
"error"
);

return;

}





try{



/* GET SENDER ACCOUNT */


const {data:senderAccount,error:senderError}
=
await supabase
.from("accounts")
.select("*")
.eq(
"user_id",
user.id
)
.single();




if(senderError){

throw senderError;

}





/* CHECK BALANCE */


if(
Number(senderAccount.balance)
<
amount
){


showMessage(
"Insufficient balance",
"error"
);


return;

}





/* FIND RECEIVER */


const {data:receiverAccount,error:receiverError}
=
await supabase
.from("accounts")
.select("*")
.eq(
"account_number",
recipientAccount
)
.single();





if(receiverError || !receiverAccount){


showMessage(
"Recipient account not found",
"error"
);


return;

}





if(
receiverAccount.account_id
===
senderAccount.account_id
){


showMessage(
"You cannot transfer to the same account",
"error"
);


return;

}





/* UPDATE SENDER BALANCE */


const newSenderBalance =
Number(senderAccount.balance)
-
amount;



const {error:updateSenderError}
=
await supabase
.from("accounts")
.update({

balance:
newSenderBalance

})
.eq(
"account_id",
senderAccount.account_id
);




if(updateSenderError){

throw updateSenderError;

}





/* UPDATE RECEIVER BALANCE */


const newReceiverBalance =
Number(receiverAccount.balance)
+
amount;



const {error:updateReceiverError}
=
await supabase
.from("accounts")
.update({

balance:
newReceiverBalance

})
.eq(
"account_id",
receiverAccount.account_id
);





if(updateReceiverError){

throw updateReceiverError;

}






/* CREATE TRANSACTION */


const {error:transactionError}
=
await supabase
.from("transactions")
.insert([

{


account_id:
senderAccount.account_id,


transaction_type:
"Transfer",


description:
description ||
"Money Transfer",


amount:
amount,


status:
"Completed",


transaction_date:
new Date()


},


{


account_id:
receiverAccount.account_id,


transaction_type:
"Deposit",


description:
"Transfer Received",


amount:
amount,


status:
"Completed",


transaction_date:
new Date()


}


]);






if(transactionError){

throw transactionError;

}






showMessage(
"Transfer successful!",
"success"
);





form.reset();





}

catch(error){


console.error(error);


showMessage(
error.message,
"error"
);


}




});


});






/* ===============================
   MESSAGE DISPLAY
================================ */


function showMessage(
text,
type
){


const message =
document.getElementById(
"message"
);



message.textContent =
text;



message.className =
type === "success"
?
"success-message"
:
"error-message";

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
