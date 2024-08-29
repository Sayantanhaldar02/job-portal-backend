const { image_upload_middleware } = require("../middleware/job_seeker_image.middleware");
const JobSeekerProfileModel = require("../models/job_seeker_profile.models"); // Import the JobSeekerProfileModel from the models folder
const { delete_sub_folder } = require("../service/job_seeker_image.service"); // Import the delete_sub_folder service function

// Create job seeker profile handler function
// image_upload_middleware("jobseeker")
const handel_create_job_seeker_profile = async (req, res) => {
    // console.log(req.body)
    // console.log(req.files.profile_photo)
    // Check if a profile already exists for the given user ID
    const profile = await JobSeekerProfileModel.findOne({
        user_id: req.user.user_id
    });
    if (profile) return res.status(409).json({
        message: "Jobseeker's profile already exists!" // Return conflict status if profile exists
    });

    try {
        // Create a new JobSeekerProfile instance with the request body data
        const new_job_seeker = await new JobSeekerProfileModel(req.body);
        new_job_seeker.user_id = req.user.user_id; // Assign the user ID to the profile
        new_job_seeker.profile_photo = req.files['profile_photo'] && req.files['profile_photo'][0]; // Assign the path of the profile photo
        new_job_seeker.resume = req.files['resume'] && req.files['resume'][0]; // Assign the path of the resume
        await new_job_seeker.save(); // Save the new profile to the database

        return res.status(201).json({
            message: "Profile created!", // Respond with success message
            profile: new_job_seeker // Return the newly created profile
        });
    } catch (error) {
        return res.status(400).json({
            message: "Profile not created!", // Respond with an error message if profile creation fails
            error: error.message // Return the error message
        });
    }
}

// Get job seeker profile handler function
const handel_get_job_seeker_profile = async (req, res) => {
    // Find a profile by the user ID
    const profile = await JobSeekerProfileModel.findOne({
        user_id: req.user.user_id
    });
    if (!profile) return res.status(409).json({
        message: "Employer's profile not found!", // Return conflict status if profile does not exist
    });
    return res.status(201).json({
        profile // Return the found profile
    });
}

// Update job seeker profile handler function
const handel_update_job_seeker_profile = async (req, res) => {
    const update_element = req.body; // Get the elements to update from the request body
    // console.log(req.body); // Log the request body for debugging

    // Find the profile by the user ID
    const profile = await JobSeekerProfileModel.findOne({
        user_id: req.user.user_id
    });
    if (!profile) return res.status(409).json({
        message: "Employer's profile not found!" // Return conflict status if profile does not exist
    });

    try {
        // Find the profile and update it with new data
        const update_profile = await JobSeekerProfileModel.findOneAndUpdate({
            user_id: req.user.user_id
        }, {
            ...update_element, // Spread the update elements into the update query
            profile_photo: req.files['profile_photo'] ? req.files['profile_photo'][0] : profile.profile_photo, // Update profile photo if provided
            resume: req.files['resume'] ? req.files['resume'][0] : profile.resume, // Update resume if provided
        }, {
            runValidators: true, // Run validators to ensure data integrity
            new: true // Return the updated document
        });

        return res.status(201).json({
            message: "Profile updated!", // Respond with success message
            update_profile // Return the updated profile
        });
    } catch (error) {
        return res.status(400).json({
            message: "Profile not updated!", // Respond with an error message if profile update fails
            error: error.message // Return the error message
        });
    }
}

// Delete job seeker profile handler function
const handel_deletee_job_seeker_profile = async (req, res) => {
    const profile = await JobSeekerProfileModel.findOne({
        user_id: req.user.user_id
    })
    if (!profile) return res.status(409).json({
        message: "profile not found!"
    });

    try {
        
        await profile.deleteOne(); // Delete the profile from the database (commented out)
        // delete_sub_folder(`jobseeker/${req.user.user_id}`); // Call the service to delete the user's folder
        res.status(200).json({
            message: "Profile deleted successfully!" // Respond with success message
        });
    } catch (error) {
        return res.status(400).json({
            message: "Profile not deleted!", // Respond with an error message if profile deletion fails
            error: error.message // Return the error message
        });
    }
}

module.exports = {
    handel_create_job_seeker_profile, // Export the create profile handler
    handel_get_job_seeker_profile, // Export the get profile handler
    handel_update_job_seeker_profile, // Export the update profile handler
    handel_deletee_job_seeker_profile, // Export the delete profile handler
}
