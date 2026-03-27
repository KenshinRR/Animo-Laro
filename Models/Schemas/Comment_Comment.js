import mongoose from "mongoose";

const comment_comment_Schema = new mongoose.Schema({
  parent_comment_id: { type: String, required: true},
  comment_under_id: { type: String, required: true}
});

export default mongoose.model('Comment_Comment', comment_comment_Schema, 'Comment_Comments');