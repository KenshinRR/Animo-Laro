const editButton = document.getElementById("edit_photo_button");
const fileInput = document.getElementById("upload_input");
const profileImage = document.getElementById("user_pic_edit");
const smallImage = document.getElementById("user_pic_small");
const saveButton = document.getElementById("save_button");



document.addEventListener("DOMContentLoaded", function() {
    let currentUserData = JSON.parse(localStorage.getItem("currentUser")) 
                       || JSON.parse(sessionStorage.getItem("currentUser"));

    if(currentUserData){
        let user = currentUserData.user ? currentUserData.user : currentUserData;

        
        document.getElementById("username").value = user.username;
        document.getElementById("password").value = user.password;
        document.getElementById("bio").value = user.bio;
        if(user.avatar.startsWith("data:")){
            document.getElementById("user_pic_edit").src = user.avatar;
            document.getElementById("user_pic_small").src = user.avatar;
        } else {
            document.getElementById("user_pic_edit").src = "../View/" + user.avatar;
            document.getElementById("user_pic_small").src = "../View/" + user.avatar;
        }
    }
});

editButton.addEventListener("click", function () {
    fileInput.click();
});

fileInput.addEventListener("change", function () {
    const file = this.files[0];

    if (file) {
        const reader = new FileReader();

        reader.onload = function (e) {
            profileImage.src = e.target.result;
            smallImage.src = e.target.result;

            // Save temporarily so Save button will keep it
            profileImage.dataset.newAvatar = e.target.result;
        };

        reader.readAsDataURL(file);
    }
});

document.getElementById("save_button").addEventListener("click", function() {

    
    let updatedUsername = document.getElementById("username").value;
    let updatedPassword = document.getElementById("password").value
    let updatedBio = document.getElementById("bio").value;
    let newAvatar = document.getElementById("user_pic_edit").dataset.newAvatar;


    
    let currentUserData = JSON.parse(localStorage.getItem("currentUser")) 
                       || JSON.parse(sessionStorage.getItem("currentUser"));

    if(currentUserData){
        // Determine the object structure
        let user = currentUserData.user ? currentUserData.user : currentUserData;

        
        user.username = updatedUsername;
        user.password = updatedPassword;
        user.bio = updatedBio;
        if(newAvatar){
            user.avatar = newAvatar;
        }
        
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

