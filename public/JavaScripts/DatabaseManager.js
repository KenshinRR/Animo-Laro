class DatabaseManager {
  constructor() {
    this.baseURL = "https://animo-laro.onrender.com/api";
  }

  async fetchJSON(url, options = {}) {
    try {
      const res = await fetch(url, { ...options, credentials: "include" });
      if (!res.ok) {
        console.error(`Request failed: ${res.status} ${res.statusText}`);
        return null;
      }
      return await res.json();
    } catch (err) {
      console.error("Fetch error:", err);
      return null;
    }
  }

  async getCurrentUser() {
    const data = await this.fetchJSON(`${this.baseURL}/me`, { method: "GET", headers: { "Content-Type": "application/json" } });
    return data?.user || null;
  }

  async getAllPosts() {
    return await this.fetchJSON(`${this.baseURL}/posts`);
  }

  async getPostById(id) {
    if (!id) return null;
    return await this.fetchJSON(`${this.baseURL}/posts/${encodeURIComponent(id)}`);
  }

  async addPost(post) {
    if (!post?.poster_id) {
      console.error("Cannot add post: poster_id is missing");
      return null;
    }
    return await this.fetchJSON(`${this.baseURL}/create_post`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post)
    });
  }

  async editPost(id, post) {
    if (!id || !post) return null;
    return await this.fetchJSON(`${this.baseURL}/edit_post/${encodeURIComponent(id)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, post_data: post })
    });
  }

  async deletePostByID(id) {
    if (!id) return null;
    return await this.fetchJSON(`${this.baseURL}/delete_post/${encodeURIComponent(id)}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id })
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