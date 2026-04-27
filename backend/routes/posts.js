import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import isAdmin from "../middleware/isAdmin.js";
import { allPosts, createPost, deletePost, singlePost } from "../controllers/postController.js";


const router = express.Router();


router.get('/posts', authMiddleware, allPosts);
router.post('/posts', authMiddleware, isAdmin, createPost);
router.get('/posts/:id', authMiddleware, singlePost);
router.delete('/posts/:id', authMiddleware, isAdmin, deletePost);   

export default router;