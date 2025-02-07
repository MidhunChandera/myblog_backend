const mongoose = require('mongoose');
const Comment = require('../controllers/commentmodel');
const User = require('../models/usermodel'); 
const Blog = require('../models/blogmodel'); 



exports.addComment = async (req, res) => {
    try {
        const { comment, user, blogid } = req.body;

        if (!mongoose.Types.ObjectId.isValid(user) || !mongoose.Types.ObjectId.isValid(blogid)) {
            return res.status(400).json({ error: "Invalid user or blog ID" });
        }

 
        const userExists = await User.findById(user);
        const blogExists = await Blog.findById(blogid);

        if (!userExists || !blogExists) {
            return res.status(404).json({ error: "User or Blog not found" });
        }

        // Create a new comment
        const newComment = new Comment({
            comment,
            user: new mongoose.Types.ObjectId(user), 
            blogid: new mongoose.Types.ObjectId(blogid)  
        });

        await newComment.save();
        res.status(200).json({ message: "Comment added", comment: newComment });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to add comment", details: error.message });
    }
};
