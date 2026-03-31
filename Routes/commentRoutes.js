import express from "express";
import * as commentController from "../Contoller/CommentController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.get("/comments", commentController.getComments);          // all comments
router.get("/comments/:postId", commentController.getComments);  // comments by post ID
router.get("/comment/:id", commentController.getSpecificComment);
router.post("/create_comment", requireAuth, commentController.createComment);
router.post("/edit_comment/:id", requireAuth, commentController.editComment);
router.post("/delete_comment/:id", requireAuth, commentController.deleteCommentByID);
router.get("/replies/:commentId", commentController.getReplies);

export default router;