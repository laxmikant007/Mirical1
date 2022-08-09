const { check } = require('express-validator');

exports.validateQuote = [
    check('name')
    .isLength({min: 2, max:20})
    .withMessage("Please Enter Your Name"),
    check('phone')
    .isMobilePhone("en-IN", "en-US")
    .withMessage("Please Enter A Valid Indian Contact Number"),
    check('email')
    .isEmail()
    .withMessage("Please Enter A Valid Email Address"),
    check("service")
    .notEmpty()
    .withMessage("Please Select A service"),
    check("message")
    .isLength({min: 40, max:500})
    .withMessage("Please Enter A Description Of Your Request (40-500 Words)")
]