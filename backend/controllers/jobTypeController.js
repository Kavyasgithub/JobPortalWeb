const JobType = require("../models/jobTypeModel");
const ErrorResponse = require("../utils/errorResponse");


//create job category
exports.createJobType = async (req, res, next) => {
    try {
        const { jobTypeName } = req.body;
        const newJobType = await JobType.create({
            jobTypeName,
            user: req.user._id
        });

        res.status(201).json({
            success: true,
            message: 'Job category created successfully',
            jobType: newJobType
        });
    } catch (error) {
        next(error);
    }
}

// all job categories
exports.allJobTypes = async (req, res, next) => {
    try {
        const jobTypes = await JobType.find();
        res.status(200).json({
            success: true,
            jobTypes
        });
    } catch (error) {
        next(error);
    }
}   

// update jobtype
exports.updateJobType = async (req, res, next) => {
    try {
        const jobType = await JobType.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json({
            success: true,
            message: 'Job category updated successfully',
            jobType
        })
    } catch (error) {
        next(error);
    }
}
