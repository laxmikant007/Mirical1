const express = require('express');
const { check, body } = require('express-validator');
const { isSignedIn, isAuthenticated } = require('../controllers/auth');
const { getUserById, getUser, updateUser, getUserProfilePicture, updateUserName, updateEmail, getUserBlogList, increaseUserFollower, increaseProfileFollowing, removeUserFollower, removeProfileFollowing, getUserDetails } = require('../controllers/user');
const { isRequestValidated } = require('../validators/auth');
const router = express.Router();

// Param
router.param("userId", getUserById);

// Actual Routes

// Read
router.get("/user/:userId", isSignedIn, isAuthenticated, getUser);
router.get("/user/profile/:userId", getUserDetails);
router.get("/user/profile/image/:userId", getUserProfilePicture)
router.get('/user/blogs/:userId', isSignedIn, isAuthenticated, getUserBlogList);

// Update
router.put("/user/:userId", isSignedIn, isAuthenticated, updateUser);
router.put("/user/username/:userId", isSignedIn, isAuthenticated, [check('user_name',"Username should have at least 5 characters!").isLength({min: 5})], isRequestValidated ,updateUserName);
router.put("/user/email/:userId", isSignedIn, isAuthenticated, [check('email',"Please Enter A Valid Email address").isEmail()], isRequestValidated ,updateEmail);
router.put('/user/followers/:userId', isSignedIn, isAuthenticated, increaseUserFollower, increaseProfileFollowing)
router.put('/user/remove/follower/:userId', isSignedIn, isAuthenticated, removeUserFollower, removeProfileFollowing)

module.exports = router;