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