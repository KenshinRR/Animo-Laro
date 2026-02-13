const edit_post_icons = document.getElementsByClassName("edit_post_icon");
const popup = document.getElementById("popup");

popup.style.display = "none";

for (let edit_icon_index = 0; edit_icon_index < edit_post_icons.length; edit_icon_index++) {
    edit_post_icons[edit_icon_index].addEventListener("click", (event) => {
        // console.log("Showing popup!");
    // Get mouse coordinates from the click event
    const x = event.clientX;
    const y = event.clientY;

    // Position the popup
    popup.style.left = x + "px";
    popup.style.top = y + "px";

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