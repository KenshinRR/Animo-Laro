// db.js
// import { MongoClient } from "mongodb";
import User from '../Schemas/User.js';

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
  console.log("Looking for user with only username:", { username}); // logs both
  return user;
}

export async function createUser(username, password) {
  const existingUser = await User.findOne({ username });
  if(existingUser) return null;
  // back up
  try{
    const newUser = new User({
        username,
        password,
        bio: 'Add a bio...',
        avatar: 'default_avatar'
    });

    await newUser.save();
    return newUser;
  }
  catch (err){
    if(err.code === 11000){ // 11000 duplicate value 
      return null;
    }
    throw err;
  }
}

export async function updateUserProfile(username, newUsername, bio, avatar, password) {
  const user = await User.findOne({ username });
  if (!user) return null;

    // keep old details if unchanged
  const updateFields = {
    username: newUsername && newUsername.trim() !== "" ? newUsername : user.username,
    bio: bio && bio.trim() !== "" ? bio : user.bio,
    avatar: avatar && avatar.trim() !== "" ? avatar : user.avatar,
  };

  if (password && password.trim() !== "") {
    updateFields.password = password;
  }

  const updatedUser = await User.findOneAndUpdate(
    { username },
    updateFields,
    { new: true }
  );

  return updatedUser;
}