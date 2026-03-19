import DatabaseManager from '../Contoller/DatabaseManager.js';

const popup = document.getElementById("popup");
popup.style.display = "none";

function attachEditPopup() {
    const edit_post_icons = document.getElementsByClassName("edit_post_icon");

    for (let i = 0; i < edit_post_icons.length; i++) {
        const icon = edit_post_icons[i];

        icon.addEventListener("click", async (event) => {
            event.stopPropagation();

            // Get mouse coordinates
            const x = event.pageX;
            const y = event.pageY;

            // Position the popup at the mouse location
            popup.style.left = x + "px";
            popup.style.top = y + "px";

            popup.dataset.post_id = icon.dataset.post_id;
            popup.style.display = "flex";

            await toggleEditDeleteButtons();
        });
    }
}

// Hide popup when clicking anywhere else
document.addEventListener("click", (event) => {
    const edit_post_icons = Array.from(document.getElementsByClassName("edit_post_icon"));
    if (!edit_post_icons.includes(event.target)) {
        popup.style.display = "none";
    }
});

// Popup buttons
const popup_view_button = document.getElementById("popup_view");
const popup_edit_button = document.getElementById("popup_edit");
const popup_delete_button = document.getElementById("popup_delete");

popup_view_button.addEventListener("click", () => {
    window.location.href = `/Pages/view_post_page.html?id=${popup.dataset.post_id}`;
});

popup_edit_button.addEventListener("click", () => {
    window.location.href = `/Pages/edit_post_page.html?id=${popup.dataset.post_id}`;
});

popup_delete_button.addEventListener("click", deletePost);

async function toggleEditDeleteButtons() {
    const posts = await DatabaseManager.getAllPosts();
    const current_post = posts.find(p => p._id === popup.dataset.post_id);
    const curr_user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (curr_user && current_post && curr_user.username === current_post.poster) {
        popup_edit_button.style.display = "flex";
        popup_delete_button.style.display = "flex";
    } else {
        popup_edit_button.style.display = "none";
        popup_delete_button.style.display = "none";
    }
}

async function deletePost() {
    const posts = await DatabaseManager.getAllPosts();
    const current_post = posts.find(p => p._id === popup.dataset.post_id);
    const curr_user = JSON.parse(sessionStorage.getItem("currentUser"));

    if (current_post && curr_user && current_post.poster === curr_user.username) {
        alert(`Deleting post "${current_post.title}"!`);
        // TODO: call backend API to delete post in DB
    } else {
        alert("Cannot delete this post. You are not the original poster.");
    }
}

export { attachEditPopup };