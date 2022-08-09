const User = require('../models/user');
const bcrypt = require('bcrypt');
const formidable = require('formidable');
const fs = require('fs');
const _ = require('lodash');
const Blog = require('../models/blog');

exports.getUserById = (req, res, next, id) => {
    User.findById(id)
        .exec((err, user) => {
            if (err || !user) return res.status(400).json({ error: "No User Found!" })
            req.profile = user;
            next();
        })
}

exports.getUser = (req, res) => {
    req.profile.createdAt = undefined;
    req.profile.updatedAt = undefined;
    req.profile.profilePicture = undefined;
    return res.json(req.profile)
}

exports.getUserDetails = (req,res) => {
    req.profile.role = req.profile.createdAt = req.profile.updatedAt = req.profile.profilePicture = req.profile.hash_password = req.profile.contact = req.profile.email = undefined;
    return res.json(req.profile)
}

// Load Image In Background as middleware
exports.getUserProfilePicture = (req, res, next) => {
    if (req.profile.profilePicture.data) {
        res.set("Content-Type", req.profile.profilePicture.contentType)
        return res.send(req.profile.profilePicture.data);
    }
    next();
}


exports.updateUser = (req, res) => {

    let form = new formidable.IncomingForm();
    form.keepExtensions = true;

    form.parse(req, (err, fields, file) => {
        if (err) return res.status(400).json({ error: "Something went wrong!", err: err })
        if (!fields.firstName) {
            return res.status(400).json({ error: "Please Enter A Valid Name" })
        }

        User.findOne({ contact: fields.contact })
            .exec((err, user) => {
                if (err) return res.status(404).json({ error: "Something went wrong while searching database!", err: err })
                if (user) {
                    const profileId = JSON.stringify(req.profile._id);
                    const userNameId = JSON.stringify(user._id);

                    if (profileId !== userNameId) {
                        return res.status(409).json({ error: "Contact Number already registered!" })
                    }
                }

                if (req.body.password) {
                    req.body.hash_password = bcrypt.hashSync(req.body.password, 10);
                }

                let _user = req.profile;
                _user = _.extend(_user, fields);

                // Handle Profile Picture here
                if (file.profilePicture) {
                    if (file.profilePicture.size > 2000000) {   // File size should be less than 2 Mb
                        return res.status(400).json({ error: "File Size too big! Try a file with less than 2 MB in size!" })
                    }
                    _user.profilePicture.data = fs.readFileSync(file.profilePicture.path);
                    _user.profilePicture.contentType = file.profilePicture.type;
                }

                // Save To Database
                _user.save((err, user) => {
                    if (err) return res.status(400).json({ error: "Failed to update user profile!", err: err })
                    user.profilePicture = undefined;
                    res.json({ message: "User Details Updated Successfully!", user })
                })
            })
    })
}

exports.updateUserName = (req, res) => {
    User.findOne({ user_name: req.body.user_name })
        .exec((err, user) => {
            if (err) return res.status(400).json({ error: "Something went wrong" })
            if (user) {
                const profileId = JSON.stringify(req.profile._id);
                const userNameId = JSON.stringify(user._id);

                if (profileId !== userNameId) {
                    return res.status(409).json({ error: "Username already taken! Please Choose Another Username!" })
                } else if (profileId === userNameId) {
                    return res.status(400).json({ error: "You Already Have The Same Username! You Can Go Back If You Don't Want To Change Your Username!" })
                }
            }
            req.profile.user_name = req.body.user_name;
            const _user = req.profile;
            _user.save((err, updatedUserName) => {
                if (err) return res.status(400).json({ error: "Failed To Update The User Name!" })
                return res.status(200).json({ message: "Succesfully Updated the Username" })
            })
        })
}

exports.updateEmail = (req, res) => {
    User.findOne({ email: req.body.email })
        .exec((err, user) => {
            if (err) return res.status(400).json({ error: "Something went wrong" })
            if (user) {
                const profileId = JSON.stringify(req.profile._id);
                const userNameId = JSON.stringify(user._id);

                if (profileId !== userNameId) {
                    return res.status(409).json({ error: "Email address already exist! Please add Another Email address!" })
                } else if (profileId === userNameId) {
                    return res.status(400).json({ error: "You Already Have The Same Email Address! You Can Go Back If You Don't Want To Change Your Email!" })
                }
            }
            req.profile.email = req.body.email;
            const _user = req.profile;
            _user.save((err, updateEmail) => {
                if (err) return res.status(400).json({ error: "Failed To Update The Email Address!" })
                return res.status(200).json({ message: "Succesfully Updated the Email Address!" })
            })
        })
}

exports.getUserBlogList = (req, res) => {
    return res.json(req.profile.blogs)
}

// Middlewares

// Follower List Increment 
exports.increaseUserFollower = (req,res, next) => {
    // User Details Of Logged In User To Add In Follower List
    const newFollower = { _id: req.profile._id, fullName: req.profile.fullName, user_name: req.profile.user_name }
    User.findOne({ _id: req.body._id })
        .exec((err, user) => {
            if(err) return res.status(400).json({ error: "Something went wrong while searching Database!" })
            if(user) {
                let sameProfile = false;
                for(let i=0; i<user.followers.length; i++) {
                    if(user.followers.length !== 0) {
                        let followerId = JSON.stringify(user.followers[i]._id);
                        let profileId = JSON.stringify(req.profile._id);
                        if(followerId && followerId == profileId) {
                            sameProfile = true;
                            break;
                        } 
                    }
                }

                if(sameProfile) {
                    return res.status(400).json({ error: `You're Already Following ${req.body.user_name}` })
                }

                let _user = user;
                _user.followers.push(newFollower)

                _user.save((err, user) => {
                    if(err) return res.status(400).json({ error: `Failed To Update ${user.fullName} Follower's List` })
                    next();
                })
            }
        })
}

// Following List Increment of logged In User
exports.increaseProfileFollowing = (req,res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $push: { followings: req.body }},
        { new: true, useFindAndModify: false },
        (err, user) => {
            if(err) return res.status(400).json({ error: `Failed To Update ${user.fullName} Following's List` })
            res.status(200).json({ message: "User Followed Successfully!" })
        }
    )
}

// Follower List Decrement
exports.removeUserFollower = (req,res, next) => {
    User.findByIdAndUpdate(
        { _id: req.body._id },
        { $pull: { followers: { _id: req.profile._id } }},
        { new: true, useFindAndModify: false },
        (err, user) => {
            if(err) return res.status(400).json({ error: `Failed To Update ${user.fullName} Follower's List` })
            next();
        }
    )
}

// Following List Decrement of logged In User
exports.removeProfileFollowing = (req,res) => {
    User.findByIdAndUpdate(
        { _id: req.profile._id },
        { $pull: { followings: { _id: req.body._id } }},
        { new: true, useFindAndModify: false },
        (err, user) => {
            if(err) return res.status(400).json({ error: `Failed To Update ${user.fullName} Follower's List` })
            res.status(200).json({ message: "User Unfollowed Successfully!" })
        }
    )
}