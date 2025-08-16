const ErrorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
    let error = {...err};
    error.message = err.message;

    if(err.name === "CostError"){
        const message = `Resources not found ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // mongoose duplicate value
    if(err.name === 11000){ 
        const message = "Duplicate field value entered";
        error = new ErrorResponse(message, 404);
    }

    // mongoose validation error
    if(err.name === "validationError"){
        const message = Object.values(err.errors).map(val => ' ' + val.message);
        error = new ErrorResponse(message, 404);
    }

    res.status(error.codeStatus || 500).json({
        success: false,
        error: error.message || "server error"
    }) 
}

module.exports = errorHandler;