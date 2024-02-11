// create a new router named authRouter
const authRouter = require('express').Router();
// import the functions from the controllers/auth.js
const { user_signup, user_login, getUsers } = require('../controllers/auth');


// create a new user
authRouter.post('/api/signup', user_signup);

// login a user
authRouter.post('/api/login',user_login);

// get all users
authRouter.get('/api/users',getUsers);


module.exports = authRouter;
