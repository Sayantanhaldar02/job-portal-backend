const {
    Cloudnary_image_service
} = require("../service/job_seeker_image.service");


class JobSeekerProfileService {
    constructor(jobSeekerProfileModel) {
        this.jobSeekerProfileModel = jobSeekerProfileModel
    };

    async createProfile(req) {
        const profile = await this.jobSeekerProfileModel.findOne({
            user_id: req.user.user_id
        });
        if (profile) throw new Error( "Jobseeker's profile already exists!");

        try {
            const new_job_seeker = await new this.jobSeekerProfileModel(req.body);
            new_job_seeker.user_id = req.user.user_id;
            new_job_seeker.profile_photo = req.files.profile_photo && await Cloudnary_image_service(req.files.profile_photo);
            new_job_seeker.resume = req.files.resume && await Cloudnary_image_service(req.files.resume);
            await new_job_seeker.save();

            return {
                message: "Profile created!",
                profile: new_job_seeker
            };
        } catch (error) {
            throw new Error("Profile not created!");
        };
    };

    async getProfile(req) {
        const profile = await this.jobSeekerProfileModel.findOne({
            user_id: req.user.user_id
        });
        if (!profile) throw new Error( "Employer's profile not found!");
        return {
            profile
        };
    };

    async updateProfile(req) {
        const update_element = req.body;

        const profile = await this.jobSeekerProfileModel.findOne({
            user_id: req.user.user_id
        });

        if (!profile) throw new Error( "Employer's profile not found!");

        try {
            const update_profile = await this.jobSeekerProfileModel.findOneAndUpdate({
                user_id: req.user.user_id
            }, {
                ...update_element,
                profile_photo: req.files.profile_photo ? await Cloudnary_image_service(req.files.profile_photo) : profile.profile_photo, // Update profile photo if provided
                resume: req.files.resume ? await Cloudnary_image_service(req.files.resume) : profile.resume, // Update resume if provided
            }, {
                runValidators: true,
                new: true
            });

            return {
                message: "Profile updated!",
                update_profile
            };
        } catch (error) {
            throw new Error("Profile not updated!");
        }
    };

    async deleteProfile(req) {
        const profile = await this.jobSeekerProfileModel.findOne({
            user_id: req.user.user_id
        })
        if (!profile) throw new Error("profile not found!");

        try {
            await profile.deleteOne(); 
            return {
                message: "Profile deleted successfully!", 
            };
        } catch (error) {
            throw new Error("Profile not deleted!");
        }
    }
}


module.exports = JobSeekerProfileService;