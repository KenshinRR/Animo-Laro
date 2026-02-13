function createNewPost(title, poster, desc)
{
    var newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post_container")

    var h1_title = document.createElement("h1");
    h1_title.textContent = title;

    var h2_title = document.createElement("h2");
    h2_title.textContent = poster

    var desc_p = document.createElement("p");
    desc_p.textContent = desc;

    newPostDiv.appendChild(h1_title);
    newPostDiv.appendChild(h2_title);
    newPostDiv.appendChild(desc_p);

    document.getElementById("main_feed_container").appendChild(newPostDiv);
}

var localPosts = JSON.parse(localStorage.getItem("posts"));
localPosts.forEach(postData => {
  createNewPost(postData.title, postData.poster, postData.description);
});