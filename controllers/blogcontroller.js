const Blog = require('../models/blogmodel');
const jwt = require('jsonwebtoken');
const user = require('../models/usermodel');
const Comment = require('./commentmodel');




exports.addBlog = async (req, res) => {
    try {
        const { title, content, author, category } = req.body;

        if (!title || !content || !author || !category) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (!req.user || !req.user.id) {
            return res.status(401).json({ error: "Unauthorized. User not found." });
        }

        const userId = req.user.id; 

        const imagename = req.file ? req.file.filename : null;

        const blog = new Blog({
            title,
            content,
            author,
            category,
            image: imagename,
            user: userId
        });

        await blog.save();
        res.status(201).json({ message: "Blog added successfully", blog });
    } catch (error) {
        console.error("Error adding blog:", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};



exports.listblog=async(req,res)=>{
    try {
        const blogs=await Blog.find({})
        res.status(200).json(blogs)
    } catch (error) {
        res.status(401).json(error)
    }
}

exports.singleblog = async (req, res) => {
    try {
        const { blogid } = req.params; 
        console.log("Received Blog ID:", blogid);

      
        const singleBlog = await Blog.findById(blogid).populate('author', 'username');

        if (!singleBlog) {
            return res.status(404).json({ error: "Blog not found" });
        }

        // Fetch the comments related to this blog and populate the username
        const comments = await Comment.find({ blogid }).populate('user', 'username');


        res.status(200).json({ blog: singleBlog, comments });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to fetch blog and comments", details: error.message });
    }
};

exports.removeblog=async(req,res)=>{
    try {
        const { id } = req.body; 
        await Blog.findByIdAndDelete(id);
        res.send("blog removed");
      } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting blog");
      }
 }


exports.getUserBlogs = async (req, res) => {
    try {
      const userId = req.user.id; // Extract user ID from the authenticated request
      const blogs = await Blog.find({ user: userId }); // Fetch only the logged-in user's blogs
      res.status(200).json(blogs);
    } catch (error) {
      res.status(500).json({ message: "Error fetching blogs", error });
    }
};




  exports.updateBlog = async (req, res) => {
    try {
      const blogId = req.params.id; 
  
      // Check if an image is being uploaded
      let imageUrl = null;
      if (req.file) {
        // If a new image is uploaded, process it
        imageUrl = `/${req.file.filename}`; // Adjust this path based on where the image is stored
      }
  
      // Update the blog with the new title, content, and image if provided
      const updatedBlog = await Blog.findByIdAndUpdate(
        blogId,
        {
          ...req.body,
          image: imageUrl || req.body.image, 
        },
        { new: true }
      );
  
      if (!updatedBlog) {
        return res.status(404).json({ error: 'Blog not found' });
      }
  
      res.json({
        message: "Blog updated",
        updatedBlog,
        updatedAt: updatedBlog.updatedAt,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to update blog' });
    }
  };
  