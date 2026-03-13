



document.addEventListener("DOMContentLoaded", function() {
    let currentUserData = JSON.parse(localStorage.getItem("currentUser")) 
                       || JSON.parse(sessionStorage.getItem("currentUser"));

    if(currentUserData){
        let user = currentUserData.user ? currentUserData.user : currentUserData;

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