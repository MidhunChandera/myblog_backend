const express = require('express');
const multer = require('multer');
const { addBlog, listblog, singleblog, removeblog, getUserBlogs, updateBlog } = require('../controllers/blogcontroller');
const authenticateUser = require('../middleware/authMiddleware');

const blogRouter = express.Router();


const storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        return cb(null, `${Date.now()}${file.originalname}`);
    }
});
const upload = multer({ storage: storage });


blogRouter.post('/add',authenticateUser, upload.single("image"), addBlog); 
blogRouter.post('/get', listblog); 
blogRouter.post('/single/:blogid', singleblog); 
blogRouter.delete('/remove',removeblog)
blogRouter.post('/user-blogs',authenticateUser,getUserBlogs)
blogRouter.patch('/update/:id', upload.single('image'), updateBlog);


module.exports = blogRouter;
