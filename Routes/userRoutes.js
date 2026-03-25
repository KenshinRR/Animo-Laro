import express from "express";
import { getProfile, registerUser, loginUser, logoutUser, updateProfile, getCurrentUser} from "../Contoller/UserController.js";
import { requireAuth } from "../middleware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/logout", logoutUser);
router.post("/updateProfile", requireAuth, updateProfile);
router.get("/me", requireAuth, getCurrentUser);
router.get("/getUser", getProfile);

export default router;