import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  poster_id: { type: String, required: true },
  description: { type: String, required: true },
  likes: { type: Number, required: true },
  link: { type: String, required: false}
});

export default mongoose.model('Post', postSchema, 'Posts');