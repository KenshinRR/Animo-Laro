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

  getAllUsers() {
    return this.users;
  }

  async getPostById(id) {
    if (!this.posts) return null;

    // MongoDB _id comes as string in the JSON from /api/posts
    // So we just match against _id (string) instead of post_id
    return this.posts.find(post => post._id === id) || null;
  }
  
  async addPost(post){
    var post_id = post_id = crypto.randomUUID();
    var title = post.title;
    var poster = post.poster;
    var description = post.description;
    var likes = post.likes;
    var link = post.link;
    
    fetch('/api/create_post',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({post_id, title, poster, description, likes, link})
    })
    .then(response => {
      response.json()
      if (!response.ok)
      {
        alert("Post failed to add!");
      }
    })
    .then(data => {
      console.log("Server response:", data);
    })
    .catch(err => {
      console.error("Error:", err);
    });
  }
}

const DBManager = new DatabaseManager();
export default DBManager;