const express = require('express');
const { newsletter, getNewsletter } = require('../controllers/newsletter');
const { isRequestValidated } = require('../validators/auth');
const { validateNewsletterEmail } = require('../validators/newsletter');
const router = express.Router();

router.post('/newsletter', validateNewsletterEmail, isRequestValidated, newsletter )
router.post('/getnewsletter', getNewsletter)

module.exports = router;