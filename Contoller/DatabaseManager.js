class DatabaseManager {
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

const DBManager = new DatabaseManager();
export default DBManager;