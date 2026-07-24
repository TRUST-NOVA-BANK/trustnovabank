async function loadUserProfile(){

    const userId = localStorage.getItem("user_id");

    if(!userId){
        window.location.href = "login.html";
        return;
    }


    const { data: user, error } = await supabase
        .from("users")
        .select("*")
        .eq("user_id", userId)
        .single();


    if(error){

        console.log(error);
        alert("Unable to load profile");
        return;

    }


    document.getElementById("user_photo").src =
        user.profile_image || "images/default-user.png";


    document.getElementById("user_name").innerHTML =
        user.first_name + " " + user.last_name;


    document.getElementById("user_email").innerHTML =
        user.email;


    document.getElementById("user_nationality").innerHTML =
        "Nationality: " + (user.nationality || "Not set");


    document.getElementById("user_status").innerHTML =
        "Status: " + user.status;

}


loadUserProfile();




async function loadUserCard(){

    const userId = localStorage.getItem("user_id");


    const {data:user,error}=await supabase
    .from("users")
    .select("*")
    .eq("user_id",userId)
    .single();


    if(error){

        console.log(error);
        return;

    }


    document.getElementById("user_photo").src =
    user.profile_image || "images/default-user.png";


    document.getElementById("user_name").innerHTML =
    user.first_name + " " + user.last_name;


    document.getElementById("user_email").innerHTML =
    user.email;


    document.getElementById("user_nationality").innerHTML =
    "Nationality: " + (user.nationality || "Not Set");

}


loadUserCard();



