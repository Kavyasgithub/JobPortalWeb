const User = require('../models/userModel');
const ErrorResponse = require('../utils/errorResponse');


exports.signup = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password, role } = req.body;
        // Check if user already exists
        const userExist = await User.findOne({ email });
        if (userExist) {
            return next(new ErrorResponse('Email already registered', 400));
        }
        const newUser = await User.create({
            firstName,
            lastName,
            email,
            password,
            role
        });
        // Remove password from response
        const userObj = newUser.toObject();
        delete userObj.password;
        res.status(201).json({
            success: true,
            user: userObj
        });
    } catch (error) {
        next(error);
    }
}

exports.signin = async (req, res, next) => {
    try {
        const { email, password } = req.body;
        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }
        // Check password
        const isMatch = await user.matchPassword(password);
        if (!isMatch) {
            return next(new ErrorResponse('Invalid credentials', 401));
        }
        // Remove password from response
        // const userObj = user.toObject();
        // delete userObj.password;
        // res.status(200).json({
        //     success: true,
        //     user: userObj
        // });

        sendTokenResponse(user, 200, res);

    } catch (error) {
        next(error);
    }
}

// Function to send JWT token in response
const sendTokenResponse = (user, statusCode, res) => {
    const token = user.getSignedJwtToken();
    res.status(statusCode)
    .cookie('token', token, {maxAge: 60 * 60 * 1000, httpOnly: true})
    .json({
        success: true,
        user: {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            role: user.role
        }
    });
}

// logout function
exports.logout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        success: true,
        message: 'Logged out successfully',
        data: {}
    });
}

// user profile function
exports.userProfile = async (req, res, next) => {
    try {
        const user = await User.findById(req.user._id).select('-password');
        if (!user) {
            return next(new ErrorResponse('User not found', 404));
        }
        res.status(200).json({
            success: true,
            user
        });
    } catch (error) {
        next(error);
    }
}