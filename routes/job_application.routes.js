const {
    Router
} = require("express");
const {
    authenticateTo
} = require("../middleware/auth.middleware");
const {
    handel_post_job_application,
    handel_get_job_application_employer,
    handel_get_job_application_job_seeker,
    handel_application_status_update
} = require("../controller/job_applicatin.controller");

const router = Router()

// POST request to apply for a job
router.post("/:id", authenticateTo(['jobseeker']), handel_post_job_application)

// GET request to get all job applications for a jobseeker
router.get("/", authenticateTo(['jobseeker']), handel_get_job_application_job_seeker)

// GET request to get all job applications for an employer
router.get("/emp-application", authenticateTo(['employer']), handel_get_job_application_employer)

// PATCH request to update the status of a job application
router.patch("/:id", authenticateTo(['employer']), handel_application_status_update)


module.exports = {
    jobApplicationRouter: router
}