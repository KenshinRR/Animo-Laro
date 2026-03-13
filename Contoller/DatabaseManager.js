class DatabaseManager {
  static instance;

  constructor() {
    if (DatabaseManager.instance) {
      return DatabaseManager.instance;
    }
    DatabaseManager.instance = this;
  }
  // added
  async initialize() {
    try {
      const res = await fetch('/api/posts');
      this.posts = await res.json();
      console.log("Successfully loaded posts:", this.posts);
    } catch (err) {
      console.error("Failed to load posts:", err);
    }
  }

  setData(users, posts){
    this.users = users;
    this.posts = posts;
    console.log("Successfuly loaded the data");
  }

  getAllPosts(){
    return this.posts;
  }

  getAllUser(){
    return this.users;
  }
}

export default new DatabaseManager();