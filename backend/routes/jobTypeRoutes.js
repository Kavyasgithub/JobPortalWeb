const express = require('express');
const router = express.Router();
const { createJobType, updateJobType,allJobTypes } = require("../controllers/jobTypeController");
const { isAuthenticated, isAdmin } = require('../middleware/auth');
const { deleteJobType } = require('../controllers/jobsController');

// Job Type routes

// /api/type/create
router.post('/type/create', isAuthenticated, isAdmin, createJobType);

// /api/type/jobs
router.get('/type/jobs', allJobTypes);

// /api/type/update/:id
router.put('/type/update/:id', isAuthenticated, isAdmin, updateJobType);

// /api/type/delete/:id
router.delete('/type/delete/:id', isAuthenticated, isAdmin, deleteJobType);




module.exports = router;