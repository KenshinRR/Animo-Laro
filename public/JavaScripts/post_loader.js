// Loading posts from database
fetch("/JSON files/posts_database.json")
  .then(response => response.json())
  .then(postsData => {
    // get the posts from localStorage
    var localPosts = JSON.parse(localStorage.getItem("posts")) || [];
    
    // create a copy of jsonUsers
    var allPosts = [...postsData];
    localPosts.forEach(localPosts => {
        // check if the same user exist across the two user data
        const exists = allPosts.some(u => u.user_id === localPosts.user_id);
        if (!exists) {
            // add the user to the user list
            allPosts.push(localPosts);
        }
    });

    // save the new users to the local storage
    localStorage.setItem("posts", JSON.stringify(allPosts));

    // postsData.forEach(post_element => {
    //     console.log("Creating post " + post_element.post_id);
    //     createNewPost(post_element.title, post_element.poster, post_element.description);
    // });
  })
  .catch(error => console.error("Error loading JSON:", error));