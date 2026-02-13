document.addEventListener("DOMContentLoaded", async function() {

    console.log("HelloMOFO");
  
    const [users, posts, userPosts] = await Promise.all([
        fetch("../JSON files/users_database.json").then(res => res.json()),
        fetch("../JSON files/posts_database.json").then(res => res.json()),
        fetch("../JSON files/user_post_database.json").then(res => res.json())
    ]);

    let currentUserData = JSON.parse(localStorage.getItem("currentUser")) 
                       || JSON.parse(sessionStorage.getItem("currentUser"));

    if(!currentUserData) return; 

    let currentUser = currentUserData.user ? currentUserData.user : currentUserData;

 
    let currentUserPostLinks = userPosts.filter(up => up.user_id == currentUser.user_id);

    
    let currentUserPosts = currentUserPostLinks.map(link => {
        return posts.find(p => p.post_id == link.post_id);
    }).filter(p => p); 

   
    let activitySection = document.getElementById("user_activity");

   
    activitySection.innerHTML = "<h1>Recent Activity:</h1>";

    currentUserPosts.forEach(post => {
        let article = document.createElement("article");
        article.classList.add("activity");

        article.innerHTML = `
            <h2>Title:${post.title}</h2>
            <p><strong>Poster:</strong> ${post.poster}<br>
            <strong>Description:</strong>${post.description}</p>
        `;

        activitySection.appendChild(article);
    });
});