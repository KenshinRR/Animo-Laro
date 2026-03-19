class DatabaseManager {

  async getAllPosts(){
    var posts = null;

    try {
      const res = await fetch('/api/posts');
      posts = await res.json();
      console.log("Successfully loaded posts:", posts);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }

    return posts;
  }

  getAllUser(){
    return this.users;
  }

  addPost(post){
    this.posts.push(post);

    fetch('/api/create_post',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, poster, description, likes, link})
    })
    .then(response => response.json())
    .then(data => {
      console.log("Server response:", data);
    })
    .catch(error => {
      console.error("Error:", error);
    });
  }
}

const DBManager = new DatabaseManager();
export default DBManager;