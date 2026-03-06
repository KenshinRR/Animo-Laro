// Back button
const back_button = document.getElementById("back_button");
back_button.addEventListener("click", () => window.location.href="/Pages/main_feed.html")

const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); 
// console.log("Loaded " + postId); // "123"

// Declaring elements
const title_header = document.getElementById("post_title");
const poster_header = document.getElementById("poster_name");
const post_description = document.getElementById("post_description");
const game_link_container = document.querySelector(".game_link_container");

// Getting the data
const posts_data = JSON.parse(localStorage.getItem("posts"));
const current_post_data = posts_data.find(post => post.post_id == postId);
console.log("Current post data: " + current_post_data);

// Setting the text contents
title_header.textContent = current_post_data.title;
poster_header.textContent = current_post_data.poster;
post_description.textContent = current_post_data.description;

if(current_post_data.link !== ""){
    const game_link = document.createElement('a');
    game_link.className = "game_link";
    game_link.href = current_post_data.link;
    game_link.textContent = current_post_data.link;
    game_link.target = "_blank"; // opens in new tab
    game_link_container.appendChild(game_link);
}
else{
    const coming_soon = document.createElement('span');
    coming_soon.className = "game_link";
    coming_soon.textContent = "Coming Soon";
    game_link_container.appendChild(coming_soon);
}

// Back button
const back_button = document.getElementById("back_button");
back_button.addEventListener("click", () => window.location.href="/Pages/main_feed.html")
