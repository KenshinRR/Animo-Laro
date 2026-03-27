// Use to show which user likes/dislikes which post

import mongoose from "mongoose";

const user_like_Schema = new mongoose.Schema({
  user_id: { type: String, required: true},
  post_id: { type: String, required: true},
  like_Value: { type: Number, required: true} // either 1 or -1
});

export default mongoose.model('User_Like', user_like_Schema, 'User_Likes');