function createNewPost(parent, title, poster, desc)
{
    var newPostDiv = document.createElement("div");
    newPostDiv.classList.add("post_container")

    var h1_title = document.createElement("h1");
    h1_title.textContent = title;

    var h2_title = document.createElement("h2");
    h2_title.textContent = poster

    newPostDiv.appendChild(h1_title);
    newPostDiv.appendChild(h2_title);

    document.getElementById("main_feed_container").appendChild(newPostDiv);
}

// Loading posts from database
fetch("../JSON files/posts_database.json")
  .then(response => response.json())
  .then(data => {
    data.forEach(post_element => {
        console.log("Creating post " + post_element.post_id);
        createNewPost(post_element.title, post_element.poster, post_element.description);
    });
  })
  .catch(error => console.error("Error loading JSON:", error));
