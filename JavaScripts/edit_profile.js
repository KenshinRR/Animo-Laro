let users = JSON.parse(localStorage.getItem("users"));

let user = users[0];

document.getElementById("username").value = user.username;
document.getElementById("password").value = user.password;
document.getElementById("bio").value = user.bio;
document.getElementById("user_pic_edit").src = "../Images/" + user.avatar;
document.getElementById("user_pic_small").src ="../Images/" + user.avatar;

document.addEventListener("DOMContentLoaded", function() {
    let currentUserData = JSON.parse(localStorage.getItem("currentUser")) 
                       || JSON.parse(sessionStorage.getItem("currentUser"));

    if(currentUserData){
        let user = currentUserData.user ? currentUserData.user : currentUserData;

        
        document.getElementById("username").value = user.username;
        document.getElementById("password").value = user.password;
        document.getElementById("bio").value = user.bio;
        document.getElementById("user_pic_edit").src = "../Images/" + user.avatar;
        document.getElementById("user_pic_small").src ="../Images/" + user.avatar;
    }
});

document.getElementById("save_button").addEventListener("click", function() {

    
    let updatedUsername = document.getElementById("username").value;
    let updatedPassword = document.getElementById("password").value
    let updatedBio = document.getElementById("bio").value;

    
    let currentUserData = JSON.parse(localStorage.getItem("currentUser")) 
                       || JSON.parse(sessionStorage.getItem("currentUser"));

    if(currentUserData){
        // Determine the object structure
        let user = currentUserData.user ? currentUserData.user : currentUserData;

        
        user.username = updatedUsername;
        user.password = updatedPassword;
        user.bio = updatedBio;

        
        if(currentUserData.user){ 
            localStorage.setItem("currentUser", JSON.stringify(currentUserData));
        } else { 
            sessionStorage.setItem("currentUser", JSON.stringify(user));
        }

        // Optional: also update the users array so changes persist across sessions
        let users = JSON.parse(localStorage.getItem("users")) || [];
        let index = users.findIndex(u => u.user_id === user.user_id);
        if(index !== -1){
            users[index] = user;
            localStorage.setItem("users", JSON.stringify(users));
        }
        window.location.href = "profile_view.html";
        //alert("Profile updated!");
    }

});

