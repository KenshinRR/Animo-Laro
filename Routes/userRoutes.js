import express from "express";
import { getProfile, registerUser, loginUser, updateProfile} from "../Contoller/UserController.js";

const router = express.Router();

router.get("/getUser", getProfile);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/updateProfile", updateProfile);

export default router;