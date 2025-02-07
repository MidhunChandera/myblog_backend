const mongoose = require('mongoose');

const CommentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.ObjectId,
        ref: "User", // Ensure this matches your User model
        required: true
    },
    blogid: { // Use "blog" instead of "blogid" for consistency
        type: mongoose.Schema.ObjectId,
        ref: "Blog", // Ensure this matches your Blog model
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now // Use Date.now (without parentheses)
    }
});

const Comment = mongoose.model("Comment", CommentSchema);
module.exports = Comment;
