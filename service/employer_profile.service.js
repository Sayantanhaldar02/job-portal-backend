const {
    Cloudnary_image_service
} = require("./job_seeker_image.service");


class EmployerProfileService {
    constructor(employerProfileModel) {
        this.employerProfileModel = employerProfileModel
    }

    async createProfile(req) {
        try {

            const profile = await this.employerProfileModel.findOne({
                created_by: req.user.user_id
            });

            if (profile) throw new Error("Employer's profile already exists!");


            const new_profile = await this.employerProfileModel(req.body)
            new_profile.company_logo = req.files.company_logo && await Cloudnary_image_service(req.files.company_logo); // Set the company_logo field to the
            // console.log(new_profile.company_logo)
            new_profile.created_by = req.user.user_id; // Set the created_by field to the user's ID.
            await new_profile.save(); // Save the new profile to the database.

            // Return a success response with the newly created profile.
            return {
                message: "Profile created!",
                new_profile
            };
        } catch (error) {
            throw new Error("Profile not created!");
        }
    };

    async getProfile(req) {
        // Find the employer profile using the user ID from the request.
        const emp_profile = await this.employerProfileModel.findOne({
            created_by: req.user.user_id
        });

        // If no profile is found, return a not found response.
        if (!emp_profile) throw new Error("Resource: Employer's profile not found!");

        // Return a success response with the found profile.
        return {
            message: "Profile found!",
            emp_profile
        };
    };


    async updateProfile(req) {
        // console.log(req.files.company_logo)
        const id = req.user.user_id;
        const update_element = req.body;
        const update_files = req.files;

        const emp_p = await this.employerProfileModel.findOne({
            created_by: id
        });

        if (!emp_p) throw new Error("Resource: Employer's profile not found!");

        
        const update_profile = await this.employerProfileModel.findOneAndUpdate({
            created_by: id
        }, {
            ...update_element,
            company_logo: update_files.company_logo ?  await Cloudnary_image_service(req.files.company_logo) : emp_p.company_logo 
        }, {
                runValidators: true, // Ensure the update data passes schema validation.
                new: true // Return the updated profile.
            });
            
            // Return a success response with the updated profile.
            // console.log(update_files)
            return {
                message: "Profile updated!",
                update_profile
            };

        // try {
        //     // Update the profile with the new data using the findOneAndUpdate method.
            
        // } catch (error) {
        //     console.log(error)
        //     // Return an error response if the profile update fails.
        //     throw new Error("Profile not updated!");
        // }
    };


    async deleteProfile(req) {
        const id = req.user.user_id;

        const emp_p = await this.employerProfileModel.findOne({
            created_by: id
        });

        if (!emp_p) throw new Error("Resource: Employer's profile not found!");
        await emp_p.deleteOne();

        return {
            message: "Profile deleted successfully!"
        };
    }
};


module.exports = EmployerProfileService;