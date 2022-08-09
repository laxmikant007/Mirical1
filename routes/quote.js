const express = require('express');
const { isSignedIn, isAuthenticated, isAdmin } =  require('../controllers/auth');
const { sendQuoteMessage, getAllQuotes, getQuoteById, removeQuote } = require('../controllers/quote');
const { getUserById } = require('../controllers/user');
const { isRequestValidated } = require('../validators/auth')
const { validateQuote } = require('../validators/quote');
const router = express.Router();

// Params
router.param("userId", getUserById);
router.param("quoteId", getQuoteById);

// Create
router.post('/quote', validateQuote, isRequestValidated, sendQuoteMessage);

// Read
router.get('/getquotes/:userId', isSignedIn, isAuthenticated, isAdmin, getAllQuotes);

// Delete
router.delete('/quote/:quoteId/:userId', isSignedIn, isAuthenticated, isAdmin, removeQuote);

module.exports = router;
