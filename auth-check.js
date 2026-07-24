/* =====================================
   TRUSTNOVA BANK
   AUTH CHECK SYSTEM
===================================== */



document.addEventListener(
"DOMContentLoaded",
async function(){



    const currentPage =
    window.location.pathname
    .split("/")
    .pop();



    /*
        Pages anyone can access
    */

    const publicPages = [

        "",

        "index.html",

        "login.html",

        "register.html"

    ];





    /*
        Skip checking public pages
    */


    if(
        publicPages.includes(currentPage)
    ){

        return;

    }







    /*
        Get logged in user
    */


    const {

        data,

        error

    } = await supabase.auth.getUser();






    /*
        No login session
    */


    if(
        error ||
        !data.user
    ){


        window.location.href =
        "login.html";


        return;


    }








    /*
        Save current user
    */


    localStorage.setItem(

        "user",

        JSON.stringify(
            data.user
        )

    );





});
