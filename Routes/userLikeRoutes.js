import express from "express";
import { toggleLike, getPostVotes } from "../Contoller/UserLikeController.js";

const router = express.Router();

router.post("/vote", toggleLike);
router.get("/votes/:post_id", getPostVotes);

export default router;