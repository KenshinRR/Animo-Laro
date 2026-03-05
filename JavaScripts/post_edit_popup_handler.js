const edit_post_icons = document.getElementsByClassName("edit_post_icon");
const popup = document.getElementById("popup");

popup.style.display = "none";

for (let edit_icon_index = 0; edit_icon_index < edit_post_icons.length; edit_icon_index++) {
    edit_post_icons[edit_icon_index].addEventListener("click", (event) => {
        // console.log("Showing popup!");
    // Get mouse coordinates from the click event
    const x = event.pageX;
    const y = event.pageY;

    // Position the popup
    popup.style.left = x + "px";
    popup.style.top = y + "px";

    // dataset
    popup.dataset.post_id = edit_post_icons[edit_icon_index].dataset.post_id;

    // Show the popup
    popup.style.display = "flex";
    });
}

// Optional: hide popup when clicking anywhere else
document.addEventListener("click", (event) => {
    const exists = Array.from(edit_post_icons).some(el => el === event.target);
    if (!exists) {
    popup.style.display = "none";
    }
});

// Popup buttons
const popup_view_button = document.getElementById("popup_view");
const popup_edit_button = document.getElementById("popup_edit");
const popup_delete_button = document.getElementById("popup_delete");

popup_view_button.addEventListener("click", () => {
    window.location.href="/Pages/view_post_page.html?id="+popup.dataset.post_id;
});

// Editing a post
popup_edit_button.addEventListener("click", (e) => {
    window.location.href="/Pages/edit_post_page.html?id="+popup.dataset.post_id;
});

// Deleting a post
popup_delete_button.addEventListener("click", delete_post);
function delete_post()
{
    // Retrieve the array from localStorage
    const postArray = JSON.parse(localStorage.getItem("posts")) || [];
    const userData = JSON.parse(sessionStorage.getItem("currentUser"));

    // Find the item with the matching a_id
    const post_found = postArray.find(selected_post => {
        return selected_post.post_id == popup.dataset.post_id;
    });
    
    console.log("Poster: " + post_found.poster + " vs " + userData.username);

    if (post_found.poster == userData.username)
    {
        alert("Deleting post!");
    }
    else
    {
        alert("Cannot delete this post. You are not the original poster");
    }
}