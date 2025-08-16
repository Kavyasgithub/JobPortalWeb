const mongoose = require("mongoose");
const { ObjectId } = mongoose.Schema.Types;
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//job history schema
const jobHistorySchema = new mongoose.Schema({
    
    title: {
        type: String,
        trim: true,
        maxlength: 70,
    },
     description: {
        type: String,
        trim: true,
    },
    salary: {
        type: Number,
        trim: true,
    },
    location: {
        type: String,
    },
    interviewDate: {
        type: Date,
    },
    applicationStatus: {
        type: String,
        enum: ['pending', 'accepted', 'rejected'],  
        default: 'pending',
    },
    user:{
        type: ObjectId,
        ref: "User",
        required: true
    }

}, {timestamps:true})


// User schema
// user schema is used to create a user in the database
const userSchema = new mongoose.Schema({
    
    firstName: {
        type: String,
        trim: true,
        required: [true, 'first name is required'],
        maxlength: 32,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'last name is required'],
        maxlength: 32,
    },
    email: {
        type: String,
        trim: true,
        required: [true, "e-mail is required"],
        unique: true,
        match:[
            // /^\w+([\.-]?\w+)*([\.-]?\w+)*(\.\w{2,3})+$/,
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            'Please add a valid email'
        ]
    },
    password: {
        type: String,
        trim: true,
        required: [true, 'password is required'],
        minlength: [6, 'password must have at least (6) characters'],
    },

    jobsHistory: [jobHistorySchema],

    role: {
        type:Number,
        default:0
    }
}, {timestamps:true})

// /encrypting password before saving
userSchema.pre('save' , async function(next){
    if(!this.isModified('password')) {
        return next();
    }
    this.password = await bcrypt.hash(this.password, 10)
})

// compare password
userSchema.methods.matchPassword = async function(enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}

// return a JWT token
userSchema.methods.getSignedJwtToken = function() {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: 3600 // 1 hour
    });
}

module.exports = mongoose.model("User", userSchema);