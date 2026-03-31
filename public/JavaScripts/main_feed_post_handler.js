import DatabaseManager from './DatabaseManager.js';
import { attachEditPopup } from './post_edit_popup_handler.js'; 

let currentUser = null;

async function initCurrentUser() {
    try {
        const data = await DatabaseManager.getCurrentUser();
        if (data) {
            currentUser = data;
            if (!currentUser._id && currentUser.id) currentUser._id = currentUser.id;
            console.log("Logged in as:", currentUser.username);
        } else {
            console.warn("No logged-in user found in session");
        }
    } catch (err) {
        console.error("Failed to fetch current user:", err);
    }
}

function createNewPost(post) {
    const newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post_container");
    newPostDiv.dataset.post_id = post._id;

    const title_bar = document.createElement("div");
    title_bar.classList.add("post_title_bar");
    title_bar.dataset.post_id = post._id;

    const h1_title = document.createElement("h1");
    h1_title.classList.add("post_clickable", "clickable", "post_title");
    h1_title.textContent = post.title;
    h1_title.addEventListener("click", () => {
        window.location.href = `/Pages/view_post_page.html?id=${post._id}`;
    });
    title_bar.appendChild(h1_title);

    const edit_post_icon = document.createElement("img");
    edit_post_icon.dataset.post_id = post._id;
    edit_post_icon.classList.add("edit_post_icon");
    edit_post_icon.src = "/Images/System Images/Icons/Three-Dots-Horizontal.png";
    title_bar.appendChild(edit_post_icon);

    const h2_title = document.createElement("h2");
    h2_title.classList.add("poster_subheader", "clickable");
    h2_title.textContent = post.poster;
    h2_title.addEventListener("click", () => {
        window.location.href = `/Pages/view_post_page.html?id=${post._id}`;
    });

    const desc_p = document.createElement("p");
    desc_p.classList.add("post_description", "post_clickable", "clickable");
    desc_p.textContent = post.description;
    desc_p.addEventListener("click", () => {
        window.location.href = `/Pages/view_post_page.html?id=${post._id}`;
    });

    newPostDiv.appendChild(title_bar);
    newPostDiv.appendChild(h2_title);
    newPostDiv.appendChild(desc_p);

    createInteractionBar(post, newPostDiv);

    document.getElementById("main_feed_container").appendChild(newPostDiv);
}

async function createInteractionBar(post, parent_elem) {
    const newLikesSpan = document.createElement("span");
    newLikesSpan.classList.add("post_likes_display");
    newLikesSpan.textContent = `Likes: ${post.likes || 0}`;

    const vote_buttons_div = document.createElement("div");
    vote_buttons_div.classList.add("vote_buttons");

    const new_post_like_button = document.createElement("button");
    new_post_like_button.classList.add("post_like_btn");
    new_post_like_button.textContent = "Like";

    const new_post_dislike_button = document.createElement("button");
    new_post_dislike_button.classList.add("post_dislike_btn");
    new_post_dislike_button.textContent = "Dislike";

    vote_buttons_div.appendChild(new_post_like_button);
    vote_buttons_div.appendChild(new_post_dislike_button);

    parent_elem.appendChild(newLikesSpan);
    parent_elem.appendChild(vote_buttons_div);

    parent_elem.postData = {
        likes: post.likes || 0,
        dislikes: post.dislikes || 0,
        userVote: post.userVote || null
    };

    const handleVote = async (type) => {
        if (!currentUser?._id) return alert("You must be logged in to vote."); 
        const user_id = currentUser._id; 
        const like_Value = type === "like" ? 1 : -1;

        try {
            const res = await DatabaseManager.votePost(user_id, post._id, like_Value); 
            const updated = await DatabaseManager.getPostVotes(post._id);

            parent_elem.postData.likes = updated?.likes || 0;
            parent_elem.postData.dislikes = updated?.dislikes || 0;
            parent_elem.postData.userVote = res?.vote === 1 ? "like" : res?.vote === -1 ? "dislike" : null;

            updatePostDisplay(parent_elem);
        } catch (err) {
            console.error("Vote failed:", err);
        }
    };

    new_post_like_button.onclick = () => handleVote("like");
    new_post_dislike_button.onclick = () => handleVote("dislike");
}

function updatePostDisplay(postContainer) {
    const postData = postContainer.postData;
    const display = postContainer.querySelector(".post_likes_display");
    const likeBtn = postContainer.querySelector(".post_like_btn");
    const dislikeBtn = postContainer.querySelector(".post_dislike_btn");

    const netLikes = postData.likes - postData.dislikes;
    display.textContent = "Likes: " + netLikes;

    likeBtn.classList.toggle("vote_active_like", postData.userVote === "like");
    dislikeBtn.classList.toggle("vote_active_dislike", postData.userVote === "dislike");
}

<<<<<<< Updated upstream
const posts = await DatabaseManager.getAllPosts();

function showAllPosts()
{
    posts.forEach(post => createNewPost(post));
    attachEditPopup();
}

if (posts) {
    showAllPosts();
}

document.getElementById("search_bar").addEventListener("keydown", (e) => searchPostByTitle(e));


function searchPostByTitle(e)
{
   if (e.key === "Enter") {
    document.getElementById("main_feed_container").innerHTML = "";
    const searchBar = document.getElementById("search_bar");
    const query = searchBar.value.toLowerCase();
    // console.log("Searching for " + query);

    if (query == "")
    {
        showAllPosts();
        return;
    }

    const filtered = posts.filter(post =>
    post.title.toLowerCase().includes(query)
    );

    // Display results
    filtered.forEach(post => {
        createNewPost(post);
        attachEditPopup();
    });
}
}
=======
(async () => {
    await initCurrentUser(); 
    const posts = await DatabaseManager.getAllPosts();
    if (posts) {
        posts.forEach(post => createNewPost(post));
        attachEditPopup();
    }
})();
>>>>>>> Stashed changes
