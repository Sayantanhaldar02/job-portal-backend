const {
    Router
} = require("express");
// Import the Router function from the Express library, which is used to create modular route handlers.

const {
    handel_get_employer_profile,
    handel_create_employer_profile,
    handel_update_employer_profile,
    handel_delete_employer_profile,
    handel_employer_profile_image
} = require("../controller/employer_profile.controller");
// Import the handler functions for managing employer profiles from the employer_profile.controller file.

const {
    authenticateTo
} = require("../middleware/auth.middleware");
const {
    image_upload_middleware
} = require("../middleware/job_seeker_image.middleware");
const multer = require("multer");
// Import the authenticateTo middleware function from the auth.middleware file, which is used to enforce role-based access control.




const upload = multer({
    dest: '/upload_image'
})
const cpUpload = upload.fields([{
    name: 'com_image',
    maxCount: 1
}])


const router = Router();
// Create a new instance of the Express Router, which will be used to define routes.

router.route("/")
    .get(authenticateTo(["employer"]), handel_get_employer_profile)
    // Define a GET route on the root path ("/").
    // The route first applies the authenticateTo middleware to ensure only users with the "employer" role can access it.
    // If the user is authenticated, the handel_get_employer_profile function is called to handle the request.

    .post(authenticateTo(["employer"]), image_upload_middleware("employer"), handel_create_employer_profile)
    // Define a POST route on the root path ("/").
    // The route first applies the authenticateTo middleware to ensure only users with the "employer" role can access it.
    // If the user is authenticated, the handel_create_employer_profile function is called to handle the request.

    .patch(authenticateTo(["employer"]), image_upload_middleware("employer"), handel_update_employer_profile)
    // Define a PATCH route on the root path ("/").
    // The route first applies the authenticateTo middleware to ensure only users with the "employer" role can access it.
    // If the user is authenticated, the handel_update_employer_profile function is called to handle the request.

    .delete(authenticateTo(["employer"]), handel_delete_employer_profile)
// Define a DELETE route on the root path ("/").
// The route first applies the authenticateTo middleware to ensure only users with the "employer" role can access it.
// If the user is authenticated, the handel_delete_employer_profile function is called to handle the request.


// router.post('/emp-img-upload',authenticateTo(["employer"]), cpUpload, handel_employer_profile_image)
module.exports = {
    empProfileRouter: router
}
// Export the router as empProfileRouter, so it can be used in other parts of the application.