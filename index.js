const express = require("express");
// Import the Express library to create the application and handle routing.

const db_connection = require("./config/dbcongfig");
// Import the database connection function from the config/dbcongfig file.

const cors = require('cors');
// Import the CORS middleware to enable Cross-Origin Resource Sharing.

const cookieParser = require("cookie-parser");
// Import the cookie-parser middleware to parse cookies attached to the client request.

const {
    checkAuthentication
} = require("./middleware/auth.middleware");
// Import the checkAuthentication middleware to handle authentication logic.

const {
    userAuthRouter
} = require("./routes/user_auth.routes");
// Import the user authentication router from the user_auth.routes file.

const {
    jobListRouter
} = require("./routes/job_list.routes");
// Import the job listings router from the job_list.routes file.

const {
    empProfileRouter
} = require("./routes/employer_profile.routes");
// Import the employer profile router from the employer_profile.routes file.

const {
    jobSeekerProfileRoute
} = require("./routes/job_seeker_profile.routes");
const {
    jobApplicationRouter
} = require("./routes/job_application.routes");
// Import the job_seeker profile router from the job_seeker_profile.routes file.

// Declare the Express app instance.
const app = express();

// Define the port number on which the server will listen.
const port = 5000;

require('dotenv').config();
// Establish a connection to the MongoDB database using the specified connection string.
db_connection(process.env.MONGO_URL);

// Use middlewares
// Enable CORS for handling cross-origin requests.
app.use(cors({
    origin:["*"],
    methods:["GET", "POST", "PUT", "PATCH","DELETE"],
    credentials:true
}));

// Parse URL-encoded data with the querystring library.
app.use(express.urlencoded({
    extended: true
}));

// Parse JSON data in request bodies.
app.use(express.json());

// Configure the express server to serve static files from the "upload" directory

app.use(
    "/uploads", // mount path
    express.static("uploads") // directory to serve
);
app.use(
    "/upload_image", // mount path
    express.static("upload_image") // directory to serve
);

// Parse cookies attached to the client request.
app.use(cookieParser());

// Apply custom middleware to check user authentication on each request.
app.use(checkAuthentication);


app.get('/', (req, res) => {
    res.send('Hello World!');
  });
// Define project routers
// Use the user authentication router for routes starting with "/api/auth".
app.use("/api/auth", userAuthRouter);

// Use the job listings router for routes starting with "/api/jobs".
app.use("/api/jobs", jobListRouter);

// Use the employer profile router for routes starting with "/api/emp-profile".
app.use("/api/emp-profile", empProfileRouter);

// Use the job seeker profile router for routes starting with "/api/job-seeker".
app.use("/api/job-seeker", jobSeekerProfileRoute);

// Use the job application router for routes starting with "/api/job-application".
app.use("/api/job-application", jobApplicationRouter);


// Middleware to handle 404 errors (not found).
app.use((req, res, next) => {
    const error = new Error("Not Found");
    error.status = 404;
    next(error);
});

// Middleware to handle errors (both 404 and server errors).
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({
        error: {
            message: err.message
        }
    });
});

// Start the server and listen on the defined port.
app.listen(port, () => console.log(`Server running at http://localhost:${port}`));