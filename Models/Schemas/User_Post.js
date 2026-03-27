// Use to show which User posted which Post

import mongoose from "mongoose";

const user_post_Schema = new mongoose.Schema({
  user_id: { type: String, required: true},
  post_id: { type: String, required: true}
});

export default mongoose.model('User_Post', user_post_Schema, 'User_Posts');