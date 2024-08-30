const EmployerProfileModel = require("../models/employer_profile.model");
const TestModel = require("../models/test_model");
const {
    Cloudnary_image_service
} = require("../service/job_seeker_image.service");
// Import the EmployerProfileModel to interact with the employer profile collection in the database.










// Create employer profile
const handel_create_employer_profile = async (req, res) => {
    // console.log(req.body)
    // console.log(req.files)
    // const file  = req.files.company_logo
    // // console.log(file)

    // const result = await Cloudnary_image_service(file)
    // console.log(result)



    try {
        // Find an existing employer's profile by the user ID from the request.
        const profile = await EmployerProfileModel.findOne({
            created_by: req.user.user_id
        });

        // If a profile already exists, return a conflict response.
        if (profile) return res.status(409).json({
            message: "Employer's profile already exists!"
        });

        // If no profile exists, create a new employer profile using the request body.
        // const new_profile = await new EmployerProfileModel(req.body);
        const new_profile = await EmployerProfileModel.create(req.body)
        new_profile.company_logo = req.files.company_logo &&  await Cloudnary_image_service(req.files.company_logo); // Set the company_logo field to the
        new_profile.created_by = req.user.user_id; // Set the created_by field to the user's ID.
        await new_profile.save(); // Save the new profile to the database.

        // Return a success response with the newly created profile.
        return res.status(201).json({
            message: "Profile created!",
            new_profile
        });
    } catch (error) {
        // Return an error response if profile creation fails.
        return res.status(400).json({
            message: "Profile not created!",
            error: error.message // Return the error message
        });
    }
}

// Get employer profile
const handel_get_employer_profile = async (req, res) => {
    // Find the employer profile using the user ID from the request.
    const emp_profile = await EmployerProfileModel.findOne({
        created_by: req.user.user_id
    });

    // If no profile is found, return a not found response.
    if (!emp_profile) return res.status(404).json({
        message: "Resource: Employer's profile not found!"
    });

    // Return a success response with the found profile.
    return res.status(200).json({
        message: "Profile found!",
        emp_profile
    });
}

// Update employer profile
const handel_update_employer_profile = async (req, res) => {
    const id = req.user.user_id; // Get the user ID from the request.
    const update_element = req.body; // Get the update data from the request body.

    // Find the employer profile to be updated by the user ID.
    const emp_p = await EmployerProfileModel.findOne({
        created_by: id
    });

    // If no profile is found, return a not found response.
    if (!emp_p) return res.status(404).json({
        message: "Resource: Employer's profile not found!"
    });

    try {
        // Update the profile with the new data using the findOneAndUpdate method.
        const update_profile = await EmployerProfileModel.findOneAndUpdate({
            created_by: id
        }, {
            ...update_element,
            company_logo: req.files.company_logo ? Cloudnary_image_service(req.files.company_logo) : emp_p.company_logo,
        }, {
            runValidators: true, // Ensure the update data passes schema validation.
            new: true // Return the updated profile.
        });

        // Return a success response with the updated profile.
        return res.status(200).json({
            message: "Profile updated!",
            update_profile
        });
    } catch (error) {
        // Return an error response if the profile update fails.
        return res.status(400).json({
            message: "Profile not updated!"
        });
    }
}

// Delete employer profile
const handel_delete_employer_profile = async (req, res) => {
    const id = req.user.user_id; // Get the user ID from the request.

    // Find the employer profile to be deleted by the user ID.
    const emp_p = await EmployerProfileModel.findOne({
        created_by: id
    });

    // If no profile is found, return a not found response.
    if (!emp_p) return res.status(404).json({
        message: "Resource: Employer's profile not found!"
    });

    // Delete the profile from the database.
    await emp_p.deleteOne();
    // Return a success response indicating the profile was deleted.
    return res.status(200).json({
        message: "Profile deleted successfully!"
    });
}

// const handel_employer_profile_image = async (req, res) => {
//     try {
//         // console.log(req.files)
//         const test = await new TestModel(req.body);
//         test.com_image = req.files.com_image[0].path;
//         test.user_id = req.user.user_id;
//         await test.save();
//         return res.status(201).json({
//             message: "Image Inserted successfully"
//         });
//     } catch (error) {
//         return res.status(400).json({
//             message: "image not upload",
//             error:error.message
//         });
//     }

// }

module.exports = {
    handel_create_employer_profile,
    handel_get_employer_profile,
    handel_update_employer_profile,
    handel_delete_employer_profile,

    handel_employer_profile_image
    // Export the handler functions for use in the routing module.
}