import express from "express";
import * as postController from "../Contoller/PostController.js";
import { requireAuth } from "../middleware/auth.js";
// import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

// router.get("/posts", postController.getPosts);
// router.get("/posts/:id", postController.getSpecificPost);
// router.post("/create_post", requireAuth, postController.createPost);
// router.post("/edit_post/:id", requireAuth, postController.editPost);
// router.post("/delete_post/:id", requireAuth, postController.deletePostByID);

router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getSpecificPost);
router.post("/create_post", requireAuth, postController.createPost);
router.post("/edit_post/:id", requireAuth, postController.editPost);
router.post("/delete_post/:id", requireAuth, postController.deletePostByID);

export default router;