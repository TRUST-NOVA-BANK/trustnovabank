/* =====================================
   TRUSTNOVA BANK
   MONEY TRANSFER SYSTEM
===================================== */


document.addEventListener(
"DOMContentLoaded",
function(){



const transferForm =
document.getElementById(
"transferForm"
);



if(!transferForm){

    return;

}





transferForm.addEventListener(
"submit",
async function(e){


    e.preventDefault();





    const recipient =
    document
    .getElementById("recipient")
    .value
    .trim();




    const amount =
    Number(
    document
    .getElementById("amount")
    .value
    );




    const description =
    document
    .getElementById("description")
    .value
    .trim();







    if(
        !recipient ||
        !amount ||
        amount <= 0
    ){

        alert(
        "Enter valid transfer details."
        );


        return;

    }







    try{



        const {

            data:userData

        } =
        await supabase.auth.getUser();






        if(!userData.user){


            window.location.href =
            "login.html";


            return;


        }






        const user =
        userData.user;








        /*
            Find sender account
        */


        const {

            data:senderAccount,

            error:senderError

        } =
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








        if(
            senderAccount.balance < amount
        ){

            alert(
            "Insufficient balance."
            );


            return;


        }









        /*
            Find recipient account
        */


        const {

            data:receiverAccount,

            error:receiverError

        } =
        await supabase

        .from("accounts")

        .select("*")

        .eq(

            "account_number",

            recipient

        )

        .single();








        if(receiverError || !receiverAccount){


            alert(
            "Recipient account not found."
            );


            return;


        }









        /*
            Update sender balance
        */


        await supabase

        .from("accounts")

        .update({

            balance:

            senderAccount.balance
            -
            amount

        })

        .eq(

            "account_id",

            senderAccount.account_id

        );









        /*
            Update receiver balance
        */


        await supabase

        .from("accounts")

        .update({

            balance:

            receiverAccount.balance
            +
            amount

        })

        .eq(

            "account_id",

            receiverAccount.account_id

        );









        /*
            Sender transaction
        */


        await supabase

        .from("transactions")

        .insert({

            account_id:
            senderAccount.account_id,

            transaction_type:
            "Transfer",

            description:
            description ||
            "Money transfer",

            amount:
            amount,

            status:
            "Completed"


        });









        /*
            Receiver transaction
        */


        await supabase

        .from("transactions")

        .insert({

            account_id:
            receiverAccount.account_id,

            transaction_type:
            "Deposit",

            description:
            "Transfer received",

            amount:
            amount,

            status:
            "Completed"


        });







        alert(
        "Transfer completed successfully."
        );






        window.location.href =
        "dashboard.html";





    }

    catch(error){


        console.error(error);


        alert(
        error.message
        );


    }



});



});
