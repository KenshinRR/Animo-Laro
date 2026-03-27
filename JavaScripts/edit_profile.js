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

saveButton.addEventListener("click", async function () {

    let currentUserData = JSON.parse(localStorage.getItem("currentUser")) 
                   || JSON.parse(sessionStorage.getItem("currentUser"));

    let currentUser = currentUserData.user ? currentUserData.user : currentUserData;
    if (!currentUser) return;
    let avatarValue;

    if (profileImage.dataset.newAvatar) {
       
        avatarValue = profileImage.dataset.newAvatar;
    } else {
        
        const parts = profileImage.src.split("/");
        avatarValue = parts[parts.length - 1];
    }

    let updatedData = {
    username: currentUser.username,
    newUsername: document.getElementById("username").value,
    password: document.getElementById("password").value, // ✅ NEW
    bio: document.getElementById("bio").value,
    avatar: profileImage.dataset.newAvatar || profileImage.src
};
    try {
        const res = await fetch("/Animo-Laro/api/updateProfile", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(updatedData)
        });

        const updatedUser = await res.json();

        localStorage.setItem("currentUser", JSON.stringify(updatedUser));

        window.location.href = "profile_view.html";

    } catch (err) {
        console.error("Failed to update:", err);
    }
});

