const EmployerProfileModel = require("../models/employer_profile.model");
const JobListingModel = require("../models/job_listing.model");
const JobListService = require("../service/job_list.service");
const jobListService = new JobListService(JobListingModel, EmployerProfileModel)

const handel_get_all_joblist = async (req, res) => {
    try {
        const response = await jobListService.getAllJobs(req);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.message);
    }
}


const handel_get_single_job = async (req, res) => {
    try {
        const response = await jobListService.getJobById(req);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.message);
    }
}

// create a new job controller
const handel_create_job = async (req, res) => {
    try {
        const response = await jobListService.createJob(req);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.message);
    }
}

// update job
const handel_update_job = async (req, res) => {
    try {
        const response = await jobListService.updateJob(req);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.message);
    }
}

// delete job
const handel_delete_job = async (req, res) => {
    try {
        const response = await jobListService.deleteJob(req);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.message);
    }
}

async function insertJobs(req, res) {
    try {
        const response = await jobListService.insertManyJobs(req);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.message);
    }
}



const handel_deletemany_jobs = async (req, res) => { // Import the JobListingModel

    try {
        const response = await jobListService.deleteManyJobs(req);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.message);
    }

}

module.exports = {
    // Export the functions so they can be used in other parts of the application.
    handel_get_all_joblist,
    handel_create_job,
    handel_get_single_job,
    handel_delete_job,
    handel_update_job,
    handel_deletemany_jobs,

    insertJobs
}