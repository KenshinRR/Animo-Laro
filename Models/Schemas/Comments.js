import mongoose from "mongoose";

const comments_Schema = new mongoose.Schema({
  description: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  edited: { type: Boolean, default: false },
  user_id: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }, // <--- added
  post_id: { type: mongoose.Schema.Types.ObjectId, ref: "Post", required: true },
  parent_comment_id: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }
});

comments_Schema.index({ post_id: 1 });
comments_Schema.index({ parent_comment_id: 1 });

export default mongoose.model('Comment', comments_Schema, 'Comments');