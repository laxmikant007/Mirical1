const express = require('express');
const { getCategoryById, createCategory, getCategory, getAllCategories, updateCategory, removeCategory } = require('../controllers/category');
const { getUserById } = require('../controllers/user');
const { isSignedIn, isAuthenticated, isAdmin } = require('../controllers/auth');
const { check } = require('express-validator');
const { isRequestValidated } = require('../validators/auth');
const router = express.Router();

// Params
router.param("categoryId", getCategoryById)
router.param("userId", getUserById)

// Actual Routes
// Create
router.post("/category/create/:userId", isSignedIn, isAuthenticated, isAdmin, [check("name","Please Enter A Category Name").notEmpty()], isRequestValidated, createCategory);

// Read
router.get('/category/:categoryId', getCategory);
router.get('/categories', getAllCategories);

// Update
router.put("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, [check("name","Please Enter A Category Name").notEmpty()], isRequestValidated, updateCategory);

// Delete
router.delete("/category/:categoryId/:userId", isSignedIn, isAuthenticated, isAdmin, removeCategory)

module.exports = router;