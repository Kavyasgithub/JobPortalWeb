const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');

// load all users
exports.getAllUsers = async (req, res, next) => {

    // enable pagination
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    try {
        const count = await User.estimatedDocumentCount();
        const users = await User.find()
            .sort({ createdAt: -1 })
            .select('-password')
            .skip(pageSize * (page - 1))
            .limit(pageSize);

        res.status(200).json({
            success: true,
            users,
            page,
            pages: Math.ceil(count / pageSize),
            count
        });
        } catch (error) {
            next(error);
        }
    }


// show single user profile
exports.singleUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({
            success: true,
            user
        })
        next();
    } catch (error) {
        next(error);
    }
}

//edit user profile
exports.editUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, {new: true});

        res.status(200).json({
            success: true,
            message: 'User profile updated successfully',
            user
        })
        next();
    } catch (error) {
        next(error);
    }
}

// delete user profile
exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({
            success: true,
            message: 'User deleted successfully'
        });
    } catch (error) {
        next(error);
    } 
}

// create job history
exports.createUserJobHistory = async (req, res, next) => {
    try {
        const { title, description, salary, location } = req.body;

        // Check if the user already has a job history entry for this job
        const currentUser = await User.findOne({ _id: req.user._id });
        if (!currentUser) {
            return next(new ErrorResponse(' You must log In ', 401));
        }else{
            const addJobHistory = {
          title,
          description, 
          salary, 
          location,
          user: req.user._id
        }
        currentUser.jobsHistory.push(addJobHistory);
        await currentUser.save();
        }

        // Respond with the updated user profile
        res.status(201).json({
            success: true,
            message: 'Job history created successfully',
            currentUser
        });
    } catch (error) {
        next(error);
    }
}