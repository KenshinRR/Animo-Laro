class DatabaseManager {
  static instance;

  constructor() {
    if (DatabaseManager.instance) {
      return DatabaseManager.instance;
    }
    DatabaseManager.instance = this;
  }

  async initialize() {
    try {
      const res = await fetch('/api/posts');
      this.posts = await res.json();
      console.log("Successfully loaded posts:", this.posts);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  }

  setData(users, posts) {
    this.users = users;
    this.posts = posts;
    console.log("Successfully loaded the data");
  }

  getAllPosts() {
    return this.posts;
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
}

export default new DatabaseManager();