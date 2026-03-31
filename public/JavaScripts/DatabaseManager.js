class DatabaseManager {
  constructor() {
    this.baseURL = "https://animo-laro.onrender.com/api";
  }

  async fetchJSON(url, options = {}) {
    var posts = null;
    try {
      const res = await fetch(url, options);
      posts = await res.json();
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
    return posts;
  }

  async addPost(post){
    const { title, poster_name, poster_id, description, likes, link } = post;
    try {
      const res = await fetch(`${this.baseURL}/create_post`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ title, poster_name, poster_id, description, likes, link })
      });
      await res.json();
      if (!res.ok) alert("Post failed to add!");
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  }

  async getCurrentUser() {
    const data = await this.fetchJSON(`${this.baseURL}/me`, { 
      method: "GET", 
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    });
    return data?.user || null;
  }

  async getAllPosts() {
    return await this.fetchJSON(`${this.baseURL}/posts`);
  }

  async getPostById(id) {
    if (!id) return null;
    return await this.fetchJSON(`${this.baseURL}/posts/${encodeURIComponent(id)}`);
  }

  // POSTS

  // async addPost(post) {
  //   if (!post?.poster_id) {
  //     console.error("Cannot add post: poster_id is missing");
  //     return null;
  //   }
  //   return await this.fetchJSON(`${this.baseURL}/create_post`, {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(post)
  //   });
  // }

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


  async getComments(postId = null) {
    const url = postId
      ? `${this.baseURL}/comments/${encodeURIComponent(postId)}`
      : `${this.baseURL}/comments`;
    return await this.fetchJSON(url);
  }

  async addComment(comment) {
    if (!comment?.user_id) {
      console.error("Cannot add comment: user is not logged in");
      return null;
    }
    return await this.fetchJSON(`${this.baseURL}/create_comment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(comment)
    });
  }

  async editComment(id, commentData) {
    if (!id || !commentData) return null;
    return await this.fetchJSON(`${this.baseURL}/edit_comment/${encodeURIComponent(id)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, commentData })
    });
  }

  async deleteCommentByID(id) {
    if (!id) return null;
    return await this.fetchJSON(`${this.baseURL}/delete_comment/${encodeURIComponent(id)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
    });
  }

  async getReplies(commentId) {
    if (!commentId) return [];
    return await this.fetchJSON(`${this.baseURL}/replies/${encodeURIComponent(commentId)}`) || [];
  }
}

const DBManager = new DatabaseManager();
export default DBManager;