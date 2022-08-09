const { check } = require('express-validator');

exports.validateNewsletterEmail = [
    check('email')
    .isEmail()
    .withMessage("Please Enter A Valid Email Address")
]