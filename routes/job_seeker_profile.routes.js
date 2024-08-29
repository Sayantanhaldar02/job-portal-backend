const {
    Router
} = require("express"); // Import the Router function from Express to create a new router instance
const {
    authenticateTo
} = require("../middleware/auth.middleware"); // Import the authentication middleware
const {
    handel_create_job_seeker_profile,
    handel_get_job_seeker_profile,
    handel_update_job_seeker_profile,
    handel_deletee_job_seeker_profile,
} = require("../controller/job_seeker_profile.cntroller"); // Import the controller functions for job seeker profile operations
const {
    image_upload_middleware
} = require("../middleware/job_seeker_image.middleware"); // Import the image upload middleware
const router = Router(); // Create a new router instance

// Define routes for job seeker profile operations
router.route("/")
    .get(authenticateTo(["jobseeker"]), handel_get_job_seeker_profile) // Route for getting a job seeker profile, with authentication
    .post(authenticateTo(["jobseeker"]), image_upload_middleware("jobseeker"), handel_create_job_seeker_profile) // Route for creating a job seeker profile, with authentication and file upload handling
    .patch(authenticateTo(["jobseeker"]), image_upload_middleware("jobseeker"), handel_update_job_seeker_profile) // Route for updating a job seeker profile, with authentication and file upload handling
    .delete(authenticateTo(["jobseeker"]), handel_deletee_job_seeker_profile); // Route for deleting a job seeker profile, with authentication and file upload handling

// Export the router to be used in other parts of the application
module.exports = {
    jobSeekerProfileRoute: router // Export the router as jobSeekerProfileRoute
};