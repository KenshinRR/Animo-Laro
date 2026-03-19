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
  console.log("Looking for user:", { username, password }); // logs both
  return user;
}

export async function getUserUseUsername(username) {
  const user = await User.findOne({ username});
  console.log("Looking for user:", { username}); // logs both
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