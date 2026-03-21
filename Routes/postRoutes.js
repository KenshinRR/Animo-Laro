import express from "express";
import * as postController from "../Contoller/PostController.js";

const router = express.Router();

router.get("/posts", postController.getPosts);
router.get("/posts/:id", postController.getSpecificPost);
router.post("/create_post", postController.createPost);
router.post("/edit_post/:id", postController.editPost);

export default router;