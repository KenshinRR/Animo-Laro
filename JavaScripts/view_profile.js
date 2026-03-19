document.addEventListener("DOMContentLoaded", async function() {
    console.log("GRABBING A PROFILE")
    let currentUser = JSON.parse(localStorage.getItem("currentUser")) 
                   || JSON.parse(sessionStorage.getItem("currentUser"));

    if(currentUser){

        const res = await fetch(
            `/api/getUser?username=${encodeURIComponent(currentUser.username)}`
        );
        if(!res.ok){
            console.error("User fetch failed");
            return;
        }

        const user = await res.json();

        document.getElementById("username").textContent = user.username;
        document.getElementById("bio").textContent = user.bio;

        if(user.avatar.startsWith("data:")){
            document.getElementById("user_pic").src = user.avatar;
            document.getElementById("user_pic_small").src = user.avatar;
        } else {
            document.getElementById("user_pic").src = "../View/" + user.avatar;
            document.getElementById("user_pic_small").src = "../View/" + user.avatar;
        }
    }
});