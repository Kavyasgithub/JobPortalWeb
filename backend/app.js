const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
require("dotenv").config();
var cors = require('cors');
const cookieParser = require("cookie-parser");
const errorHandler = require("./middleware/error");

// import routes
const authRoutes = require("./routes/authRoutes");
const userRoutes = require("./routes/userRoutes");
const jobTypeRoutes = require("./routes/jobTypeRoutes");
const jobRoutes = require("./routes/jobRoutes");

// databse connection
mongoose.connect(process.env.DATABASE)
.then(() => console.log("DB connected"))
.catch((err) => {console.log(err)});

// MIDDLEWARE
app.use(morgan('dev'));
// middleware to convert req.body into json format 
app.use(bodyParser.json({limit: "5mb"}));
// middleware to convert req.body into url encoded format
app.use(bodyParser.urlencoded({
    limit: "5mb",
    extended: true 
}));
app.use(cookieParser());
app.use(cors());

// ROUTES MIDDLEWARE
// app.get('/', (req,res) => {
//     res.send("Hello from nodejs");
// })
app.use('/api', authRoutes);
app.use('/api', userRoutes);
app.use('/api', jobTypeRoutes);
app.use('/api', jobRoutes);
// error middleware
app.use(errorHandler);

// port
const port = process.env.PORT || 8000

app.listen(port, ()=>{
    console.log(`server running on ${port}`);
});