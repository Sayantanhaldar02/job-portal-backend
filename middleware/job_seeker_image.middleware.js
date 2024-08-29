const multer = require("multer"); // Import the multer package for handling file uploads
const fs = require("fs"); // Import the fs (file system) module to interact with the file system

// Set up storage configuration for multer
function confStorage(path) {
    const storage = multer.diskStorage({
        // Define the destination folder for uploaded files
        destination: function (req, file, cb) {
            // console.log(req.user);
            const upload_dir_name = `./uploads/${path}/${req.user.user_id}`; // Create a directory path based on the user's ID
            if (!fs.existsSync(upload_dir_name)) { // Check if the directory exists
                fs.mkdirSync(upload_dir_name); // Create the directory if it doesn't exist
            }
            cb(null, upload_dir_name); // Set the destination folder for the file upload
        },
        // Define the filename for uploaded files
        filename: function (req, file, cb) {
            // console.log(file)
            cb(null, `${Date.now().toString()}_${req.user.user_id}_${file.originalname}`); // Set the filename to include a timestamp, user ID, and the original filename
        }
    });
    return storage
}

const jobSeekerDetails = [{
        name: "profile_photo", // The field name for the profile photo
        maxCount: 1 // Allow only one file for the profile photo
    },
    {
        name: "resume", // The field name for the resume
        maxCount: 1 // Allow only one file for the resume
    }
]

const employerDetails = {
    name: "company_logo", // The field name for the profile photo
    maxCount: 1 // Allow only one file for the profile photo
}

// Initialize multer with the defined storage configuration
const upload = (path) => {
    return multer({
        storage: confStorage(path) // Use the custom storage configuration defined above
    }).fields( // Specify the fields to handle multiple file uploads
        path === "jobseeker" ? [...jobSeekerDetails] : [employerDetails]
    );
}

// Export the upload middleware to be used in other parts of the application
module.exports = {
    image_upload_middleware: upload // Export the upload middleware as image_upload_middleware
};