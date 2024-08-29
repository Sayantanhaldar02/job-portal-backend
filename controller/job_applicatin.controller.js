const JobApplicationModel = require("../models/job_application.model")
const JobListingModel = require("../models/job_listing.model")
const JobSeekerProfileModel = require("../models/job_seeker_profile.models")

const handel_post_job_application = async (req, res) => {
    const jobID = req.params.id
    const job = await JobListingModel.findById(jobID)
    const user = await JobSeekerProfileModel.findOne({user_id:req.user.user_id})

    // console.log(user)
    try {
        const new_applicant = await new JobApplicationModel({
            job_title: job.job_title,
            job_location: `${job.city}, ${job.state}, ${job.country}`,
            job_id: job._id,
            employer_id: job.user_id,
            company_name: job.company_name,
            salary: job.salary_range,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone_number: req.body.phone_number,
            user_id: req.user.user_id,
            resume: user.resume,
            profile_photo: user.profile_photo
        })
        await new_applicant.save()
        console.log(new_applicant.job_job_location)
        return res.status(201).json({
            message: "applied!",
            new_applicant
        })
    } catch (error) {
        return res.status(400).json({
            message: "Applied Failed!",
            error: error.message
        })
    }
}



const handel_application_status_update = async (req, res) => {
    try {
        const application_id = req.params.id;
        const application = await JobApplicationModel.findById(application_id);
        if (!application) {
            return res.status(404).json({
                message: "Application not found"
            });
        }
        await JobApplicationModel.findByIdAndUpdate(application_id, {
            status: req.body.status
        }, {
            runValidators: true,
        })
        return res.status(200).json({
            message: "Application status updated successfully",
            application
        });
    } catch (error) {
        return res.status(400).json({
            message: "Failed to update application status",
            error: error.message
        });
    }
}



const handel_get_job_application_employer = async (req, res) => {
    try {
        const all_job_application = await JobApplicationModel.find({
            employer_id: req.user.user_id
        })
        return res.status(200).json({
            message: "all job application!",
            all_job_application
        })
    } catch (error) {
        return res.status(201).json({
            message: "Application not found!",
            error: error.message
        })
    }
}


const handel_get_job_application_job_seeker = async (req, res) => {
    try {
        const all_job_application = await JobApplicationModel.find({
            user_id: req.user.user_id
        })
        return res.status(201).json({
            message: "all job application!",
            all_job_application
        })
    } catch (error) {
        return res.status(201).json({
            message: "Applications not found!",
            error: error.message
        })
    }
}


module.exports = {
    handel_post_job_application,
    handel_get_job_application_employer,
    handel_get_job_application_job_seeker,
    handel_application_status_update
}