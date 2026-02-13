function createNewPost(post_id, title, poster, desc)
{
    var newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post_container")
    newPostDiv.dataset.post_id = post_id;

    var h1_title = document.createElement("h1");
    h1_title.classList.add("post_title");
    h1_title.textContent = title;

    var edit_post_icon = document.createElement("img");
    edit_post_icon.classList.add("edit_post_icon");
    edit_post_icon.src = "../images/System Images/Icons/Three-Dots-Horizontal.png";
    h1_title.appendChild(edit_post_icon);

    var h2_title = document.createElement("h2");
    h2_title.classList.add("clickable")
    h2_title.textContent = poster

    var desc_p = document.createElement("p");
    desc_p.textContent = desc;

    newPostDiv.appendChild(h1_title);
    newPostDiv.appendChild(h2_title);
    newPostDiv.appendChild(desc_p);

    createInteractionBar(newPostDiv);

    document.getElementById("main_feed_container").appendChild(newPostDiv);
}

var localPosts = JSON.parse(localStorage.getItem("posts"));
localPosts.forEach(postData => {
  createNewPost(postData.post_id, postData.title, postData.poster, postData.description);
});

// Creating the post interaction bar
function createInteractionBar(parent_elem)
{
  var newInteractionBar = document.createElement("div");
  newInteractionBar.classList.add("post_interaction_bar");

  var newLikesSpan = document.createElement("span");
  newLikesSpan.id = "post_likes_display";
  newLikesSpan.textContent = "Likes: 0";

  var vote_buttons_div = document.createElement("div");
  vote_buttons_div.classList.add("vote_buttons");

  // Buttons
  var new_post_like_button = document.createElement("button");
  new_post_like_button.id = post_like_btn;
  new_post_like_button.textContent = "Like";

  var new_post_dilike_button = document.createElement("button");
  new_post_dilike_button.id = post_dislike_btn;
  new_post_dilike_button.textContent = "Disike";

  vote_buttons_div.appendChild(new_post_like_button);
  vote_buttons_div.appendChild(new_post_dilike_button);

  parent_elem.appendChild(newInteractionBar);
  parent_elem.appendChild(newLikesSpan);
  parent_elem.appendChild(vote_buttons_div);
}