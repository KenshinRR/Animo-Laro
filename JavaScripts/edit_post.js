// Back Button
const back_button = document.getElementById("back_button");
back_button.addEventListener("click", () => window.location.href="/Pages/main_feed.html")

// Getting post ID
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); 

// Getting the post data
const posts_data = JSON.parse(localStorage.getItem("posts"));
const current_post_data = posts_data.find(post => post.post_id == postId);

// Verifying if user can edit the post
const curr_user = JSON.parse(sessionStorage.getItem("currentUser"));
if (curr_user.username != current_post_data.poster) // change this in the future to check for IDs instead of names
{
    alert("You cannot edit this post!");
    window.location.href="/Pages/main_feed.html";
}

// Getting Data from form
document.getElementById("post_form").addEventListener("submit", function(event) {
    event.preventDefault(); // prevent page reload

    // Initialize document elements
    const title_input = document.getElementById("input_title");
    const desc_input = document.getElementById("input_desc");

    // Getting the current data

    // Setting the current data

    // Get values from inputs
    const desc = desc_input.value;
    const title = title_input.value;

    // Get the poster username from storage
    var currentUserData = JSON.parse(localStorage.getItem("currentUser"));
    if (!currentUserData) currentUserData = JSON.parse(sessionStorage.getItem("currentUser"));
    var poster = currentUserData.username;

    // Retrieve existing list from localStorage (or start with empty array)
    let savedPosts= JSON.parse(localStorage.getItem("posts")) || [];

    // Add new values as an object (or array, depending on your preference)
    savedPosts.push(
    {
        "post_id": crypto.randomUUID(),
        "title": title,
        "poster": poster,
        "description" : desc
    }
    );

    // Save back to localStorage
    localStorage.setItem("posts", JSON.stringify(savedPosts));

    // Optional: clear inputs
    document.getElementById("input_title").value = "";
    document.getElementById("input_desc").value = "";

    console.log("Succesfuly made");

    // Switch back to main feed
    window.location.href="/Pages/main_feed.html"
});
