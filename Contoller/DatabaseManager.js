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
    var post_to_return = null;
    try{
      const res = await fetch('/api/posts/'+id);
      post_to_return = await res.json();
      console.log("Successfully gotten specific post: " + post_to_return.title);
    }
    catch (err) {
      console.error("Failed to load post:", err);
    }

    return post_to_return;
  }
  
  async addPost(post){
    var title = post.title;
    var poster = post.poster;
    var description = post.description;
    var likes = post.likes;
    var link = post.link;
    
    fetch('/api/create_post',{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({title, poster, description, likes, link})
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