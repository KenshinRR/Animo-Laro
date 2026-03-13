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
await DBManager.initialize()
export default DBManager;