class DatabaseManager {
  static instance;

  constructor() {
    if (DatabaseManager.instance) {
      return DatabaseManager.instance;
    }
    DatabaseManager.instance = this;
  }

  async connect() {
    console.log("Connecting to DB...");
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