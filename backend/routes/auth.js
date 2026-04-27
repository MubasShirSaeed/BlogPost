import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import  {register, Users , login, profile, logout} from "../controllers/authController.js";
const router = express.Router();


router.post("/register", register);
router.post("/login", login);
router.get("/users", authMiddleware, Users);
router.get("/profile", authMiddleware, profile);
router.post("/logout",authMiddleware, logout);



export default router;

