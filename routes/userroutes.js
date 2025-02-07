const express=require('express')
const { loginuser, registeruser, getuserprofile } = require('../controllers/usercontroller')



const userrouter=express.Router()

userrouter.post('/register',registeruser)

userrouter.post('/login',loginuser)
userrouter.get('/profile',getuserprofile)

module.exports=userrouter