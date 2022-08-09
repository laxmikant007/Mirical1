const express = require('express');
const { validateQuery } = require('../validators/query');
const { isRequestValidated } = require('../validators/auth')
const { sendQueryMessage, getAllQueryMessages, removeQuery, getQueryById } = require('../controllers/query');
const { isSignedIn, isAdmin, isAuthenticated } = require('../controllers/auth');
const { getUserById } = require('../controllers/user');
const router = express.Router();

// Params
router.param("userId", getUserById);
router.param("queryId", getQueryById);

// Create
router.post('/query', validateQuery, isRequestValidated, sendQueryMessage);

// Read
router.get('/getqueries/:userId', isSignedIn, isAuthenticated, isAdmin, getAllQueryMessages);

// Delete
router.delete('/query/:queryId/:userId', isSignedIn, isAuthenticated, isAdmin, removeQuery);

module.exports = router;
