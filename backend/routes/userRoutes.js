const express = require('express');
const router = express.Router();
const { getAllUsers, singleUser, editUser, deleteUser, createUserJobHistory } = require("../controllers/userController");
// const { userProfile } = require("../controllers/authController");
const { isAuthenticated, isAdmin } = require('../middleware/auth');


// User routes


// /api/allusers
router.get('/allusers',isAuthenticated , isAdmin ,getAllUsers);

// /api/user/id
router.get('/user/:id', isAuthenticated, singleUser); 

// /api/user/edit/:id
router.put('/user/edit/:id', isAuthenticated, editUser );

// /api/admin/user/delete/edit/:id
router.delete('/admin/user/delete/:id', isAuthenticated, isAdmin, deleteUser );

// /user/delete/jobHistory
router.post('/user/jobHistory', isAuthenticated, createUserJobHistory );

module.exports = router;