// db.js
// import { MongoClient } from "mongodb";
import User from '../Schemas/User.js';
import Post from '../Schemas/Post.js';
import DBManager from '../../Contoller/DatabaseManager.js';

export async function getAllPosts() {
  const posts = await Post.find();
  return posts;
}

export async function getAllUsers(){
  const all_user = await User.find();
  return all_user;
}

export async function getUser(username, password) {
  const user = await User.findOne({ username, password });
  return user;
}

export async function SetData()
{
  DBManager.setData(
    await getAllUsers(),
    await getAllPosts()
  );
}