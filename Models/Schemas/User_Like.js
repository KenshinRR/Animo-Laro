// Use to show which user likes/dislikes which post
import mongoose from "mongoose";

const userLikeSchema = new mongoose.Schema({
  user_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User",
    required: true 
  },
  post_id: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Post",
    required: true 
  },
  like_value: { 
    type: Number, 
    enum: [1, -1], 
    required: true 
  }
}, { timestamps: true });

userLikeSchema.index({ user_id: 1, post_id: 1 }, { unique: true });

export default mongoose.model('User_Like', userLikeSchema, 'User_Like');