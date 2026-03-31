import * as commentDB from "../Models/Server/CommentDataLoader.js";

export async function getComments(req, res) {
  try {
    const postId = req.params.postId || null;
    const comments = await commentDB.getAllComments(postId);
    res.status(200).json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: "Failed to fetch comments" });
  }
}

export async function createComment(req, res) {
  try {
    const { description, post_id, user_id, parent_comment_id = null } = req.body;

    if (!description || !post_id || !user_id) {
      return res.status(400).json({ error: "Missing required fields: description, post_id, or user_id" });
    }

    const newComment = await commentDB.createComment({ description, post_id, user_id, parent_comment_id });
    res.status(201).json(newComment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: "Failed to create comment" });
  }
}

export async function getSpecificComment(req, res) {
  try {
    const comment = await commentDB.getSpecificComment(req.params.id);
    if (!comment) return res.status(404).json({ error: "Comment not found" });
    res.status(200).json(comment);
  } catch (err) {
    console.error("Error fetching comment:", err);
    res.status(500).json({ error: "Failed to fetch comment" });
  }
}

export async function editComment(req, res) {
  try {
    const { id, commentData } = req.body;
    if (!id || !commentData) return res.status(400).json({ error: "Missing id or commentData" });

    const updatedComment = await commentDB.editComment(id, commentData);
    res.status(200).json(updatedComment);
  } catch (err) {
    console.error("Error editing comment:", err);
    res.status(500).json({ error: "Failed to edit comment" });
  }
}

export async function deleteCommentByID(req, res) {
  try {
    const { id } = req.body;
    if (!id) return res.status(400).json({ error: "Missing comment id" });

    const deletedComment = await commentDB.deleteCommentByID(id);
    res.status(200).json(deletedComment);
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: "Failed to delete comment" });
  }
}

export async function getReplies(req, res) {
  try {
    const { commentId } = req.params;
    if (!commentId) return res.status(400).json({ error: "Missing commentId in params" });

    const replies = await commentDB.getReplies(commentId);
    res.status(200).json(replies);
  } catch (err) {
    console.error("Error fetching replies:", err);
    res.status(500).json({ error: "Failed to fetch replies" });
  }
}