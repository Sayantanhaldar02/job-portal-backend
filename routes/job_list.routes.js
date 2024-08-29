const express = require("express");
// Import the Express library, which is used to create the application and handle routing.

const {
    handel_create_job,
    handel_get_all_joblist,
    handel_get_single_job,
    handel_delete_job,
    handel_update_job,
    handel_deletemany_jobs,
    insertJobs
} = require("../controller/job_listing.controller");
// Import the handler functions for job listings from the job_listing.controller file.

const {
    authenticateTo
} = require("../middleware/auth.middleware");
// Import the authenticateTo middleware function from the auth.middleware file, used for role-based access control.

const router = express.Router();
// Create a new Express Router instance to define the routes for job listings.

router.get("/", handel_get_all_joblist);
// Define a GET route on the root path ("/").
// This route does not require authentication and calls the `handel_get_all_joblist` function to retrieve all job listings.

router.get("/:id", handel_get_single_job);
// Define a GET route for the path "/:id".
// This route retrieves a specific job listing by its ID using the `handel_get_single_job` function.

router.post("/", authenticateTo(["employer"]), handel_create_job);
// Define a POST route on the root path ("/").
// This route requires authentication and only allows users with the "employer" role to create a new job listing using the `handel_create_job` function.

router.delete("/:id", authenticateTo(["employer"]), handel_delete_job);
// Define a DELETE route for the path "/:id".
// This route requires authentication and only allows users with the "employer" role to delete a job listing by its ID using the `handel_delete_job` function.

router.patch("/:id", authenticateTo(["employer"]), handel_update_job);
// Define a PATCH route for the path "/:id".
// This route requires authentication and only allows users with the "employer" role to update a job listing by its ID using the `handel_update_job` function.

// router.delete("/deletemany", authenticateTo(["employer"]), handel_deletemany_jobs);

router.post("/insertMany", insertJobs)

module.exports = {
    jobListRouter: router
};
// Export the router as `jobListRouter`, so it can be used in other parts of the application.
