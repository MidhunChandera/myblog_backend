const express=require('express')

require('dotenv').config();
const cors=require("cors");
const blogrouter = require('./routes/blogrouter');
const userrouter = require('./routes/userroutes');
const commentrouter = require('./routes/commentroutes');


require('./connection')
const server=express()


const PORT= 3600 || process.env.PORT


server.use(express.json())
server.use(cors())
server.use('/api/blog',blogrouter)
server.use('/api/user',userrouter)
server.use('/api/comment',commentrouter)
server.use('/images',express.static('uploads'))

server.listen(PORT,()=>{
    console.log("server running");
    
})