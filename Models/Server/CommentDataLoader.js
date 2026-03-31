import mongoose from "mongoose";
import Comment from "../Schemas/Comments.js";

const { Types: { ObjectId } } = mongoose;

function toObjectId(id) {
  try {
    return new ObjectId(id);
  } catch {
    return null;
  }
}

export async function getAllComments(postId = null) {
  try {
    let query = {};

    if (postId) {
      const oid = toObjectId(postId);
      if (!oid) return [];
      query.post_id = oid;
    }

    return await Comment.find(query)
      .populate("user_id", "username")
      .lean();
  } catch (err) {
    console.error("Error in getAllComments:", err);
    return [];
  }
}

export async function createComment(commentData) {
  try {
    if (commentData.user_id)
      commentData.user_id = toObjectId(commentData.user_id);

    if (commentData.post_id)
      commentData.post_id = toObjectId(commentData.post_id);

    if (commentData.parent_comment_id)
      commentData.parent_comment_id = toObjectId(commentData.parent_comment_id);

    const newComment = new Comment(commentData);
    await newComment.save();

    return await Comment.findById(newComment._id)
      .populate("user_id", "username")
      .lean();
  } catch (err) {
    console.error("Error in createComment:", err);
    throw err;
  }
}

export async function getSpecificComment(id) {
  try {
    const oid = toObjectId(id);
    if (!oid) return null;

    return await Comment.findById(oid)
      .populate("user_id", "username")
      .lean();
  } catch (err) {
    console.error("Error in getSpecificComment:", err);
    return null;
  }
}

export async function editComment(id, commentData) {
  try {
    const oid = toObjectId(id);
    if (!oid) return null;

    return await Comment.findByIdAndUpdate(oid, commentData, { new: true })
      .populate("user_id", "username")
      .lean();
  } catch (err) {
    console.error("Error in editComment:", err);
    return null;
  }
}

export async function deleteCommentByID(id) {
  try {
    const oid = toObjectId(id);
    if (!oid) return null;

    return await Comment.findByIdAndDelete(oid).lean();
  } catch (err) {
    console.error("Error in deleteCommentByID:", err);
    return null;
  }
}

export async function getReplies(parentCommentId) {
  try {
    const oid = toObjectId(parentCommentId);
    if (!oid) return [];

    return await Comment.find({ parent_comment_id: oid })
      .populate("user_id", "username")
      .lean();
  } catch (err) {
    console.error("Error in getReplies:", err);
    return [];
  }
}