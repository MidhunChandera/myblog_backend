const express = require('express');
const { addComment } = require('../controllers/commentcontroller');

const commentrouter=express.Router()
commentrouter.post('/add',addComment)
module.exports=commentrouter