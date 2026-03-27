import mongoose from "mongoose";

const comments_Schema = new mongoose.Schema({
  comment_id: { type: String, required: true},
  description: { type: String, required: true },
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  edited: { type: Boolean, required: true },
});

export default mongoose.model('Comment', comments_Schema, 'Commen');