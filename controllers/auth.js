const jwt = require('jsonwebtoken');
const User = require('../models/user');
const expressJwt = require('express-jwt');

// Load Chance
const Chance = require('chance')

// Instantiate Chance so it can be used
const chance = new Chance();

exports.signup = (req,res) => {
    User.findOne({ $or: [{email: req.body.email}, { $and: [{ contact: req.body.contact }, { contact: {$ne: ""} }] }] })
    .exec((err,user) => {
        if(err) { 
            return res.status(404).json({ error: err }) 
        }
        if(user) return res.status(400).json({ 
            error: "User Already Exist" 
        })

        const { firstName, lastName, email, password, contact, role } = req.body
        // Using chance to create a random username
        const username = chance.string({ length: 10, alpha: true, numeric: true });

        const _user = new User({
            firstName: firstName.charAt(0).toUpperCase() + firstName.slice(1) ,
            lastName: lastName.charAt(0).toUpperCase() + lastName.slice(1),
            email,
            password,
            contact,
            role,
            user_name: username.toUpperCase()
        })

        _user.save((error, data) => {
            if(error) { 
                return res.status(400).json({ 
                    error: "Something Went Wrong!",
                    err: error
                });
            }
            if(data){ 
                return res.status(201).json({ 
                    message: "User Created Successfully!", data: data 
                })
            }
        })
    });
}

exports.signin = (req,res) => {
    User.findOne({ $or: [{email: req.body.user}, {contact: req.body.user}] })
    .exec((err, user) => {
        if(user) {
            if(user.authenticate(req.body.password)) {
                const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1d'})
                const { _id, firstName, lastName, fullName, user_name, email, contact, blogs, role, funFact, socialLinks, followers, followings } = user
                res.cookie("token", token, { expires: new Date(Date.now() + 24 * 3600000) }) // Cookie expires after 24 hours 
                res.status(200).json({
                    token: token,
                    user: {
                        _id, firstName, lastName, fullName, email, user_name, contact, blogs, role, funFact, socialLinks, followers, followings
                    },
                })
            } else {
                return res.status(400).json({ error: 'Incorrect Password' })
            }
        } else {
            return res.status(404).json({ error: "User Not Found!"})
        }
    })
}

exports.signout = (req,res) => {
    res.clearCookie("token");
    res.status(200).json({ message: "Logout Success!" })
}

// Protected Routes
exports.isSignedIn = expressJwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256'],
    userProperty: 'auth'
})

// Custom Middlewares
exports.isAuthenticated = (req,res,next) => {
    let checker = req.auth && req.profile && req.auth._id == req.profile._id

    if(!checker) {
        return res.status(400).json({ error: "Access Denied! Authorization Unsuccess!" })
    }
    next();
}

exports.isAdmin = (req,res, next) => {
    if(req.profile.role === 0) {
        return res.status(403).json({ message: "Access Denied! You're not an admin!" })
    }
    next();
}