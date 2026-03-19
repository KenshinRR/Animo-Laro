import DatabaseManager from '../Contoller/DatabaseManager.js'

function createNewPost(post_id, title, poster, desc)
{
    var newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post_container");
    newPostDiv.dataset.post_id = post_id;

    var title_bar = document.createElement("div");
    title_bar.classList.add("post_title_bar");
    title_bar.dataset.post_id = post_id;

    var h1_title = document.createElement("h1");
    h1_title.classList.add("post_clickable", "clickable", "post_title");
    h1_title.textContent = title;
    title_bar.appendChild(h1_title);

    var edit_post_icon = document.createElement("img");
    edit_post_icon.dataset.post_id = post_id;
    edit_post_icon.classList.add("edit_post_icon");
    edit_post_icon.src = "../View/System Images/Icons/Three-Dots-Horizontal.png";
    title_bar.appendChild(edit_post_icon);

    var h2_title = document.createElement("h2");
    h2_title.classList.add("poster_subheader", "poster_clickable", "clickable");
    h2_title.textContent = poster;

    var desc_p = document.createElement("p");
    desc_p.classList.add("post_description", "post_clickable", "clickable");
    desc_p.textContent = desc;

    newPostDiv.appendChild(title_bar);
    newPostDiv.appendChild(h2_title);
    newPostDiv.appendChild(desc_p);

    createInteractionBar(post_id, newPostDiv);

    document.getElementById("main_feed_container").appendChild(newPostDiv);
}

function createInteractionBar(post_id, parent_elem)
{
    var newLikesSpan = document.createElement("span");
    newLikesSpan.classList.add("post_likes_display");
    newLikesSpan.textContent = "Likes: 0";

    var vote_buttons_div = document.createElement("div");
    vote_buttons_div.classList.add("vote_buttons");
    
    var new_post_like_button = document.createElement("button");
    new_post_like_button.classList.add("post_like_btn");
    new_post_like_button.textContent = "Like";

    var new_post_dislike_button = document.createElement("button");
    new_post_dislike_button.classList.add("post_dislike_btn");
    new_post_dislike_button.textContent = "Dislike";

    vote_buttons_div.appendChild(new_post_like_button);
    vote_buttons_div.appendChild(new_post_dislike_button);

    parent_elem.appendChild(newLikesSpan);
    parent_elem.appendChild(vote_buttons_div);

    parent_elem.postData = { likes: 0, dislikes: 0, userVote: null };

    new_post_like_button.onclick = () => {
        const postData = parent_elem.postData;
        if (postData.userVote === "like") {
            postData.likes--;
            postData.userVote = null;
        } else {
            if (postData.userVote === "dislike") postData.dislikes--;
            postData.likes++;
            postData.userVote = "like";
        }
        updatePostDisplay(parent_elem);
    };

    new_post_dislike_button.onclick = () => {
        const postData = parent_elem.postData;
        if (postData.userVote === "dislike") {
            postData.dislikes--;
            postData.userVote = null;
        } else {
            if (postData.userVote === "like") postData.likes--;
            postData.dislikes++;
            postData.userVote = "dislike";
        }
        updatePostDisplay(parent_elem);
    };
}

function updatePostDisplay(postContainer)
{
    const postData = postContainer.postData;
    const display = postContainer.querySelector(".post_likes_display");
    const likeBtn = postContainer.querySelector(".post_like_btn");
    const dislikeBtn = postContainer.querySelector(".post_dislike_btn");

    const netLikes = postData.likes - postData.dislikes;
    display.textContent = "Likes: " + netLikes;

    likeBtn.classList.remove("vote_active_like");
    dislikeBtn.classList.remove("vote_active_dislike");
    
    if (postData.userVote === "like") likeBtn.classList.add("vote_active_like");
    else if (postData.userVote === "dislike") dislikeBtn.classList.add("vote_active_dislike");
}

console.log("Getting posts");
// added
var localPosts = await DatabaseManager.getAllPosts();

localPosts.forEach(postData => {
    createNewPost(
        postData._id || postData.post_id,  // _id from MongoDB
        postData.title,
        postData.poster,
        postData.description
    );
});

// Call it once the DOM is ready
document.addEventListener("DOMContentLoaded", () => {
    loadPosts();
});