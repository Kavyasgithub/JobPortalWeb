const Job = require("../models/jobModel");
const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");

//create job category
exports.createJob = async (req, res, next) => {
    try {
        const newJobType = await Job.create({
            title: req.body.title,
            description: req.body.description,
            salary: req.body.salary,
            location: req.body.location,
            jobType: req.body.jobType,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Job category created successfully',
            Job: newJobType
        });
    } catch (error) {
        next(error);
    }
}

// Single job
exports.singleJob = async (req, res, next) => {
    try {
        const job = await Job.findById(req.params.id)
            // .populate('user', 'firstName lastName')
            // .populate('jobType', 'jobTypeName');

        if (!job) {
            return next(new ErrorResponse('Job not found', 404));
        }

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
}

// update job by id
exports.updateJob = async (req, res, next) => {
     try {
        const job = await Job.findByIdAndUpdate(req.params.job_id, req.body, { new: true })
        .populate('jobType', 'jobTypeName')
        .populate('user', 'firstName lastName');

        res.status(200).json({
            success: true,
            job
        });
    } catch (error) {
        next(error);
    }
}

// show jobs
exports.showJobs = async (req, res, next) => {

    // If keyword is provided, filter jobs by title
    // If no keyword, show all jobs
    const keyword = req.query.keyword
        ? {
            title: {
                $regex: req.query.keyword,
                $options: 'i'
            }
        }
        : {}

        // filter by category
        let ids = [];
        const jobTypeCategory = await JobType.find({}, { _id: 1 });
        jobTypeCategory.forEach((cat) => {
            ids.push(cat._id);
        });

        let cat = req.query.cat;

        // jobs by location
        let locations = [];
        const jobByLocation = await Job.find({}, { location: 1 });
        jobByLocation.forEach((val) => {
            locations.push(val.location);
        });  
        let setUniqueLocations = [...new Set(locations)];
        let location = req.query.location;

        // Build filter
        let filter = { ...keyword };
        if (cat) {
            filter.jobType = cat;
        } else {
            filter.jobType = { $in: ids };
        }
        if (location && location !== '') {
            filter.location = location;
        }


        // enable pagination
        const pageSize = 4;
        const page = Number(req.query.page) || 1;
        const count = await Job.find(filter).countDocuments();
    try {
        const jobs = await Job.find(filter).sort({ createdAt: -1 })
            .skip(pageSize * (page - 1))
            .limit(pageSize);
        res.status(200).json({
            success: true,
            jobs,
            page,
            pages: Math.ceil(count / pageSize),
            count,
            setUniqueLocations
        });
    } catch (error) {
        next(error);
    }
}

//update job type
exports.updateJobType = async (req, res, next) => {
    try {
        const jobType = await JobType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Job type updated successfully',
            jobType
        })
    } catch (error) {
        next(error);
    }
}

// delete job type
exports.deleteJobType = async (req, res, next) => {
    try {
        const jobType = await JobType.findByIdAndDelete(req.params.id);
        if (!jobType) {
            return next(new ErrorResponse('Job not found', 404));
        }
        res.status(200).json({
            success: true,
            message: 'Job deleted successfully'
        });
    } catch (error) {
        next(error);
    }
}