const JobApplicationModel = require("../models/job_application.model");
const JobListingModel = require("../models/job_listing.model");
const JobSeekerProfileModel = require("../models/job_seeker_profile.models");
const JobApplicationService = require("../service/job_application.service");
const jobApplicationService = new JobApplicationService(JobApplicationModel, JobListingModel, JobSeekerProfileModel);

const handel_post_job_application = async (req, res) => {

    try {
        const response = await jobApplicationService.applyForJob(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const handel_application_status_update = async (req, res) => {
    try {
        const response = await jobApplicationService.applicationStatusUpdate(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}



const handel_get_job_application_employer = async (req, res) => {
    try {
        const response = await jobApplicationService.getApplicationForEmployer(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


const handel_get_job_application_job_seeker = async (req, res) => {
    try {
        const response = await jobApplicationService.getApplicationForJobSeeker(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    handel_post_job_application,
    handel_get_job_application_employer,
    handel_get_job_application_job_seeker,
    handel_application_status_update
}