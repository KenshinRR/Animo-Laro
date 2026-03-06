// Back Button
const back_button = document.getElementById("back_button");
back_button.addEventListener("click", () => window.location.href="/Pages/main_feed.html")

// Getting post ID from Database
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); 

// Getting the post data from Database
const posts_data = JSON.parse(localStorage.getItem("posts"));
const current_post_data = posts_data.find(post => post.post_id == postId);

// Verifying if user can edit the post
const curr_user = JSON.parse(sessionStorage.getItem("currentUser"));
if (curr_user.username != current_post_data.poster) // change this in the future to check for IDs instead of names
{
    alert("You cannot edit this post!");
    window.location.href="/Pages/main_feed.html";
}

// Initialize document elements
const title_input = document.getElementById("input_title");
const desc_input = document.getElementById("input_desc");

// Getting the current data
var curr_title = current_post_data.title;
var curr_desc = current_post_data.description;

// Setting the current data
title_input.value = curr_title;
desc_input.value = curr_desc;

// Getting Data from form
document.getElementById("post_form").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent page reload

    // Get values from inputs
    const desc = desc_input.value;
    const title = title_input.value;

    // Check if either are empty
    if (!title || !desc) {
        event.preventDefault(); // stop form submission
        alert("Title and description are required!");
        title_input.value = curr_title;
        desc_input.value = curr_desc;
        return;
    }

    // Retrieve existing list from localStorage (or start with empty array)
    let savedPosts= JSON.parse(localStorage.getItem("posts")) || [];

    // Getting the index of the post to be edited
    const post_index = savedPosts.findIndex(p => p.post_id == urlParams.get('id'));

    // Updating the values in post
    if (post_index != -1)
    {
        savedPosts[post_index].title = title_input.value;
        savedPosts[post_index].description = desc_input.value;
    }

    // Save back to localStorage
    localStorage.setItem("posts", JSON.stringify(savedPosts));
    
    alert("Post Successfully Edited!");

    // Switch back to main feed
    window.location.href="/Pages/main_feed.html"
});
