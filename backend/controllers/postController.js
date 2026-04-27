import post from "../models/post.js";

const allPosts = async (req, res) => {
    try {
        const posts = await post.find();
        return res.status(200).json(posts);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    } 
}

const createPost = async (req, res) => {
    try {
        const { title, content, imgUrl } = req.body;
        const newPost = await post.create({
            title,
            content,
            imgUrl,
        });
        return res.status(201).json(newPost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}
const singlePost = async (req, res) => {
    try {
        const { id } = req.params;  
        const singlePost = await post.findById(id);
        return res.status(200).json(singlePost);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

const deletePost = async (req, res) => { 
    try {
        const { id } = req.params;
        await post.findByIdAndDelete(id);
        return res.status(200).json({ message: "post deleted successfully" });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }   
}

export { allPosts, createPost, deletePost, singlePost };