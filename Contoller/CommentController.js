import * as commentDB from "../Models/Server/CommentDataLoader.js";

export async function getComments(req, res) {
  try {
    const postId = req.params.postId || null;  // if undefined, return all
    const comments = await commentDB.getAllComments(postId);
    res.json(comments);
  } catch (err) {
    console.error("Error fetching comments:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function createComment(req, res) {
  try {
    const comment = await commentDB.createComment(req.body);
    res.status(201).json(comment);
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function getSpecificComment(req, res) {
  try {
    const comment = await commentDB.getSpecificComment(req.params.id);
    if (!comment) {
      return res.status(404).json({ error: "Comment not found" });
    }
    res.json(comment);
  } catch (err) {
    console.error("Error fetching comment:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function editComment(req, res) {
  try {
    const commentStatus = await commentDB.editComment(req.body.id, req.body.commentData);
    res.status(201).json(commentStatus);
  } catch (err) {
    console.error("Error editing comment:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function deleteCommentByID(req, res) {
  try {
    const commentStatus = await commentDB.deleteCommentByID(req.body.id);
    res.status(201).json(commentStatus);
  } catch (err) {
    console.error("Error deleting comment:", err);
    res.status(500).json({ error: err.message });
  }
}

export async function getReplies(req, res) {
  try {
    const replies = await commentDB.getReplies(req.params.commentId);
    res.json(replies);
  } catch (err) {
    console.error("Error fetching replies:", err);
    res.status(500).json({ error: err.message });
  }
}