// db.js
// import { MongoClient } from "mongodb";
import User from '../Schemas/User.js';
import Post from '../Schemas/Post.js';
import DatabaseManager from '../../Contoller/DatabaseManager.js';

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

export async function createUser(username, password) {
  const existingUser = await User.findOne({ username });
  if(existingUser) return null;

  const newUser = new User({
      user_id: crypto.randomUUID(), // generate a random id
      username,
      password,
      bio: 'Add a bio...',
      avatar: 'default_avatar'
  });

  await newUser.save();
  return newUser;
}

export async function Initiliaze_DB_Manager()
{
  DatabaseManager.setData(
    await getAllUsers(),
    await getAllPosts()
  );
}