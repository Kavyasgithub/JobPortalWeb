const express = require('express');
const router = express.Router();
const { createJob, singleJob, updateJob, showJobs } = require("../controllers/jobsController");
const { isAuthenticated } = require('../middleware/auth');
const { isAdmin } = require('../middleware/auth');

// Job routes

// /api/jobs/create
router.post('/jobs/create', isAuthenticated, createJob);

// /api/jobs/show
router.get('/jobs/show', showJobs);

// /api/jobs/:id
router.get('/jobs/:id', singleJob);




module.exports = router;