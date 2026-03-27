import DatabaseManager from '../Contoller/DatabaseManager.js';

const back_button = document.getElementById("back_button");
back_button.addEventListener("click", () => window.location.href = "/Animo-Laro/Pages/main_feed.html");

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

async function loadPost() {
    // Getting the post data 
    const post = await DatabaseManager.getPostById(postId);

    if (!post) {
        console.error("Post not found for id:", postId);
        return;
    }
    else
    {
        console.log("Post found " + post._id);
    }

    document.getElementById("post_title").textContent = post.title;
    document.getElementById("poster_name").textContent = post.poster;
    document.getElementById("post_description").textContent = post.description;

    const game_link_container = document.querySelector(".game_link_container");
    game_link_container.innerHTML = "";
    if (post.link) {
        const game_link = document.createElement('a');
        game_link.className = "game_link";
        game_link.href = post.link;
        game_link.textContent = post.link;
        game_link.target = "_blank";
        game_link_container.appendChild(game_link);
    } else {
        const coming_soon = document.createElement('span');
        coming_soon.className = "game_link";
        coming_soon.textContent = "Coming Soon";
        game_link_container.appendChild(coming_soon);
    }

    const images_container = document.querySelector(".images_container");
    images_container.innerHTML = "";
    if (post.images && post.images.length > 0) {
        post.images.forEach(imgPath => {
            const img = document.createElement("img");
            img.src = imgPath;
            images_container.appendChild(img);
        });
    }
}

loadPost();