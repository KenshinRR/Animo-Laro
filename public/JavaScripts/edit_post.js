import DataBaseManager from './DatabaseManager.js'

// Back Button
const back_button = document.getElementById("back_button");
back_button.addEventListener("click", () => window.location.href = "/Pages/main_feed.html")

// Getting post ID from Database
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); 

// Getting the post data from Database
const current_post_data = await DataBaseManager.getPostById(postId);

// Verifying if user can edit the post
var curr_user = DataBaseManager.getCurrentUser();

if (curr_user.username != current_post_data.poster) // change this in the future to check for IDs instead of names
{
    alert("You cannot edit this post!");
    window.location.href = "/Pages/main_feed.html";
}

// Initialize document elements
const title_input = document.getElementById("input_title");
const desc_input = document.getElementById("input_desc");
const link_input = document.getElementById("input_link");

// Getting the current data
var curr_title = current_post_data.title;
var curr_desc = current_post_data.description;
var curr_link = current_post_data.link;

// Setting the current data
title_input.value = curr_title;
desc_input.value = curr_desc;
link_input.value = curr_link;

// Getting Data from form
document.getElementById("post_form").addEventListener("submit", async function(event) {
    event.preventDefault(); // prevent page reload

    // Get values from inputs
    const new_desc = desc_input.value;
    const new_title = title_input.value;
    const new_link = link_input.value;

    // Check if either are empty
    if (!new_title || !new_desc) {
        event.preventDefault(); // stop form submission
        alert("Title and description are required!");
        title_input.value = curr_title;
        desc_input.value = curr_desc;
        return;
    }

    // Saving the editted data to database
    await DataBaseManager.editPost(
        postId, 
        {
            title: new_title,
            description: new_desc,
            link: new_link
        }
    );
    
    alert("Post Successfully Edited!");

    // Switch back to main feed
    window.location.href = "/Pages/main_feed.html"
});