class DatabaseManager {
  constructor() {
    // Local backend for development
    // this.baseURL = "http://localhost:3000/api"; // <-- local backend
    this.baseURL = "https://animo-laro.onrender.com/api"; // <-- deployed backend
  }

  // POSTS
  async getAllPosts() {
    let posts = null;
    try {
      const res = await fetch(`${this.baseURL}/posts`);
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
      console.error("Error adding post:", err);
    }
  }

  async editPost(id, post) {
    const { title, description, link } = post;
    try {
      const res = await fetch(`${this.baseURL}/edit_post/${id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ id, post_data: { title, description, link } })
      });
      await res.json();
      if (!res.ok) alert("Post failed to edit!");
    } catch (err) {
      console.error("Error editing post:", err);
    }
  }

  async deletePostByID(_id) {
    try {
      const res = await fetch(`${this.baseURL}/delete_post/${_id}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
        body: JSON.stringify({ id: _id })
      });
      await res.json();
      if (!res.ok) alert("Post failed to delete!");
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  }

  async getCurrentUser() {
    let curr_user = null;
    try {
      const res = await fetch(`${this.baseURL}/me`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      curr_user = await res.json();
    } catch (err) {
      console.error("Failed to load current user:", err);
    }
    return curr_user;
  }

  async getPostById(id) {
    let post_to_return = null;
    try {
      const res = await fetch(`${this.baseURL}/posts/${id}`);
      post_to_return = await res.json();
    } catch (err) {
      console.error("Failed to load post:", err);
    }
    return post_to_return;
  }

  // COMMENTS
  async getComments(postId = null) {
    let comments = null;
    try {
      const url = postId
        ? `${this.baseURL}/comments/${encodeURIComponent(postId)}`
        : `${this.baseURL}/comments`;
      const res = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      comments = await res.json();
    } catch (err) {
      console.error("Failed to load comments:", err);
    }
    return comments;
  }

  async addComment(comment) {
    const { description, post_id, parent_comment_id } = comment;
    try {
      const res = await fetch(`${this.baseURL}/create_comment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ description, post_id, parent_comment_id }),
      });
      if (!res.ok) alert("Comment failed to add!");
      return await res.json();
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  }

  async editComment(id, commentData) {
    try {
      const res = await fetch(`${this.baseURL}/edit_comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id, commentData }),
      });
      if (!res.ok) alert("Comment failed to edit!");
      return await res.json();
    } catch (err) {
      console.error("Error editing comment:", err);
    }
  }

  async deleteCommentByID(id) {
    try {
      const res = await fetch(`${this.baseURL}/delete_comment/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ id }),
      });
      if (!res.ok) alert("Comment failed to delete!");
      return await res.json();
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  }

  async getReplies(commentId) {
    let replies = null;
    try {
      const res = await fetch(`${this.baseURL}/replies/${encodeURIComponent(commentId)}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        credentials: "include"
      });
      replies = await res.json();
    } catch (err) {
      console.error("Failed to load replies:", err);
    }
    return replies;
  }
}

const DBManager = new DatabaseManager();
export default DBManager;