const JobSeekerProfileModel = require("../models/job_seeker_profile.models");
const JobSeekerProfileService = require("../service/jobseeker_profile.service");

const jobSeekerProfileService = new JobSeekerProfileService(JobSeekerProfileModel);

// Create job seeker profile handler function
const handel_create_job_seeker_profile = async (req, res) => {
    try {
        const response = await jobSeekerProfileService.createProfile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

// Get job seeker profile handler function
const handel_get_job_seeker_profile = async (req, res) => {
    try {
        const response = await jobSeekerProfileService.getProfile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

// Update job seeker profile handler function
const handel_update_job_seeker_profile = async (req, res) => {
    try {
        const response = await jobSeekerProfileService.updateProfile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

// Delete job seeker profile handler function
const handel_deletee_job_seeker_profile = async (req, res) => {
    try {
        const response = await jobSeekerProfileService.deleteProfile(req);
        return res.status(204).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    handel_create_job_seeker_profile, 
    handel_get_job_seeker_profile, 
    handel_update_job_seeker_profile,
    handel_deletee_job_seeker_profile, 
}