class DatabaseManager {

  async getAllPosts(){
    var posts = null;

    try {
      const res = await fetch('https://animo-laro.onrender.com/api/posts');
      posts = await res.json();
      // console.log("Successfully loaded posts:", posts);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }

    return posts;
  }

  async getCurrentUser(){
    var curr_user = null;
    try{
      const curr_user = await fetch(`https://animo-laro.onrender.com/api/me`);
      curr_user = await res.json();
      // console.log("Successfully gotten specific post: " + post_to_return.title);
    }
    catch (err) {
      console.error("Failed to load current user:", err);
    }

    return curr_user;
  }

  getAllUsers() {
    return this.users;
  }

  async getPostById(id) {
    var post_to_return = null;
    try{
      const res = await fetch('https://animo-laro.onrender.com/api/posts/'+id);
      post_to_return = await res.json();
      // console.log("Successfully gotten specific post: " + post_to_return.title);
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
    
    fetch('https://animo-laro.onrender.com/api/create_post',{
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
    .catch(err => {
      console.error("Error:", err);
    });
  }

  async editPost(id, post) {
    var title = post.title;
    var description = post.description;
    var link = post.link;

    await fetch('https://animo-laro.onrender.com/api/edit_post/' + id,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({"id": id, "post_data": {title, description, link}})
    })
    .then(response => {
      response.json()
      if (!response.ok)
      {
        alert("Post failed to edit!");
      }
    })
    .catch(err => {
      console.error("Error:", err);
    });
  }

  async deletePostByID(_id) {

    fetch('https://animo-laro.onrender.com/api/delete_post/' + _id,{
        method:'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({id: _id})
    })
    .then(response => {
      response.json()
      if (!response.ok)
      {
        alert("Post failed to add!");
      }
    })
    .catch(err => {
      console.error("Error:", err);
    });
  }
}

const DBManager = new DatabaseManager();
export default DBManager;