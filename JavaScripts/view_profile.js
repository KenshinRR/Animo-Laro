let users = JSON.parse(localStorage.getItem("users"));

let user = users[0];



document.addEventListener("DOMContentLoaded", function() {
    let currentUserData = JSON.parse(localStorage.getItem("currentUser")) 
                       || JSON.parse(sessionStorage.getItem("currentUser"));

    if(currentUserData){
        let user = currentUserData.user ? currentUserData.user : currentUserData;

        document.getElementById("username").textContent = user.username;
        document.getElementById("bio").textContent = user.bio;
        document.getElementById("user_pic").src = "../Images/" + user.avatar;
        document.getElementById("user_pic_small").src ="../Images/" + user.avatar;
    }
});