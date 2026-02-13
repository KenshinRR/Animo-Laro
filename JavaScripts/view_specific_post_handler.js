const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id'); 
// console.log("Loaded " + postId); // "123"

// Declaring elements
const title_header = document.getElementById("post_title");
const poster_header = document.getElementById("poster_name");
const post_description = document.getElementById("post_description");

// Getting the data
const posts_data = JSON.parse(localStorage.getItem("posts"));
const current_post_data = posts_data.find(post => post.post_id == postId);
console.log("Current post data: " + current_post_data);

// Setting the text contents
title_header.textContent = current_post_data.title;
poster_header.textContent = current_post_data.poster;
post_description.textContent = current_post_data.description;