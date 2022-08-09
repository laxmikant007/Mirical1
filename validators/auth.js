const { check, validationResult, body } = require('express-validator');

exports.validateSignupRequest = [
    check('firstName')
    .isLength({min: 1})
    .withMessage('First Name is Required'),
    check('email')
    .isEmail()
    .withMessage('Enter A Valid Email Address'),
    check('password')
    .isLength({min: 6})
    .withMessage('Password Must Be Atleast 6 characters!'),
    check('contact')
    .if(body('contact').notEmpty()).isMobilePhone()
    .withMessage("Please Enter A Valid Contact Number or Leave it Empty!")
];
exports.validateSigninRequest = [
    check('user')
    .isLength({min: 1})
    .withMessage('Please Enter Your Email Or Contact Number'),
    check('password')
    .isLength({min:1})
    .withMessage('Password field cannot be empty')
]

exports.isRequestValidated = (req,res,next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(422).json({
        error: errors.array()[0].msg
      });
    }
    next();
}