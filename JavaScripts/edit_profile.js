const editButton = document.getElementById("edit_photo_button");
const fileInput = document.getElementById("upload_input");
const profileImage = document.getElementById("user_pic_edit");
const smallImage = document.getElementById("user_pic_small");
const saveButton = document.getElementById("save_button");



document.addEventListener("DOMContentLoaded", async function() {
    try {
        const res = await fetch("https://animo-laro.onrender.com/api/me", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });

        if (!res.ok) {
            window.location.href = "login_page.html";
            return;
        }

        const data = await res.json();
        const user = data.user;

        document.getElementById("username").value = user.username;
        document.getElementById("bio").value = user.bio;

        if (user.avatar && user.avatar.startsWith("data:")) {
            profileImage.src = user.avatar;
            smallImage.src = user.avatar;
        } else {
            profileImage.src = "../View/" + (user.avatar || "default_avatar");
            smallImage.src = "../View/" + (user.avatar || "default_avatar");
        }

    } catch (err) {
        console.error("Failed to load user:", err);
        window.location.href = "login_page.html";
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
    try {
        const meRes = await fetch("https://animo-laro.onrender.com/api/me", {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include"
        });
        if (!meRes.ok) {
            window.location.href = "login_page.html";
            return;
        }
        const meData = await meRes.json();
        const currentUser = meData.user;

        const newPassword = document.getElementById("password").value;

        const updatedData = {
            username: currentUser.username,
            newUsername: document.getElementById("username").value,
            bio: document.getElementById("bio").value,
            avatar: profileImage.dataset.newAvatar || profileImage.src,
            // only send password if user typed a new one
            ...(newPassword && { password: newPassword })
        };

        const res = await fetch("https://animo-laro.onrender.com/api/updateProfile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(updatedData)
        });

        if (!res.ok) {
            console.error("Failed to update profile");
            return;
        }

        window.location.href = "profile_view.html";

    } catch (err) {
        console.error("Failed to update:", err);
    }
});

