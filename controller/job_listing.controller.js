const EmployerProfileModel = require("../models/employer_profile.model");
const JobListingModel = require("../models/job_listing.model")
// Import the JobListingModel, which is used to interact with the job listings in the database.

const {
    get_user
} = require("../service/auth.service")
// Import the get_user function from the auth service, which may be used for user-related operations (though it's not used in this code).

// get all jobs controller
// const handel_get_all_joblist = async (req, res) => { 
//     // Define an asynchronous function to handle the request to get all job listings.
//     if (req.user && req.user.role === "employer") { 
//         // Check if the request has a user and if the user has the role of 'employer'.
//         try {
//             const jobs = await JobListingModel.find({ user_id: req.user.user_id }) 
//             // Find all job listings in the database that belong to the logged-in employer using their user_id.
//             return res.status(201).json({
//                 total_jobs: jobs.length,
//                 message: "all jobs!",
//                 jobs
//             })
//             // Respond with a status of 201, the total number of jobs, a success message, and the list of jobs.
//         } catch (error) {
//             return res.status(400).json({
//                 message: "jobs not found!"
//             })
//             // If an error occurs, respond with a status of 400 and an error message.
//         }
//     }
//     try {
//         const allJobs = await JobListingModel.find({})
//         // If the user is not an employer, find all job listings in the database.
//         return res.status(200).json({
//             total_jobs: allJobs.length,
//             all_jobs: allJobs
//         })
//         // Respond with a status of 200, the total number of jobs, and the list of all jobs.
//     } catch (error) {
//         return res.status(400).json({
//             "message": "Invalid request",
//             "error": error.message
//         })
//         // If an error occurs, respond with a status of 400, an error message, and the specific error that occurred.
//     }
// }

const handel_get_all_joblist = async (req, res) => {
    const {
        job_type,
        city,
        job_title
    } = req.query; // Get filter parameters from the request query

    if (req.user && req.user.role === "employer") {
        try {
            let query = {
                user_id: req.user.user_id
            };

            // Apply filters if provided
            if (job_type) query.job_type = {
                $regex: job_type,
                $options: 'i'
            };
            if (city) query.city = {
                $regex: city,
                $options: 'i'
            };
            if (job_title) query.job_title = {
                $regex: job_title,
                $options: 'i'
            };

            const jobs = await JobListingModel.find(query);
            return res.status(201).json({
                total_jobs: jobs.length,
                message: "all jobs!",
                all_jobs: jobs
            });
        } catch (error) {
            return res.status(400).json({
                message: "jobs not found!",
                error: error.message,
            });
        }
    }

    try {
        let query = {};

        // Apply filters if provided
        if (job_type) query.job_type = {
            $regex: job_type,
            $options: 'i'
        };
        if (city) query.city = {
            $regex: city,
            $options: 'i'
        };
        if (job_title) query.job_title = {
            $regex: job_title,
            $options: 'i'
        };

        const allJobs = await JobListingModel.find(query);
        // console.log(req.query)
        return res.status(200).json({
            total_jobs: allJobs.length,
            all_jobs: allJobs
        });
    } catch (error) {
        return res.status(400).json({
            "message": "Invalid request",
            "error": error.message
        });
    }
}


const handel_get_single_job = async (req, res) => {
    // Define an asynchronous function to handle the request to get a single job listing by ID.
    const id = req.params.id;
    // Get the job ID from the request parameters.
    try {
        const job = await JobListingModel.findById(id)
        // Find the job listing in the database by its ID.
        if (!job) return res.status(400).json({
            message: `Job not found with this id: ${id}`
        });
        // If the job is not found, respond with a status of 400 and an error message indicating that the job was not found.
        return res.status(200).json({
            job
        })
        // If the job is found, respond with a status of 200 and the job details.
    } catch (error) {
        return res.status(400).json({
            "message": "Invalid request",
            "error": error.message
        });
        // If an error occurs, respond with a status of 400, an error message, and the specific error that occurred.
    }
}

// create a new job controller
const handel_create_job = async (req, res) => {
    // Define an asynchronous function to handle the request to create a new job listing.
    const employer_profile = await EmployerProfileModel.findOne({
        created_by: req.user.user_id
    })
    if (!employer_profile) return res.status(404).json({
        data: false,
        message: "employer profile not found!"
    });
    try {
        const new_job = await new JobListingModel(req.body)
        // Create a new instance of JobListingModel with the request body data.
        new_job.company_name = employer_profile.company_name;
        new_job.company_logo = employer_profile.company_logo;
        new_job.user_id = req.user.user_id;
        // Assign the logged-in user's user_id to the new job listing.
        await new_job.save();
        // Save the new job listing to the database.
        return res.status(201).json({
            "message": "Job created",
            job: new_job
        })
        // Respond with a status of 201, a success message, and the newly created job.
    } catch (error) {
        return res.status(400).json({
            "message": "Invalid request",
            "error": error.message
        })
        // If an error occurs, respond with a status of 400, an error message, and the specific error that occurred.
    }
}

// update job
const handel_update_job = async (req, res) => {
    const employer_profile = await EmployerProfileModel.findOne({
        created_by: req.user.user_id
    })
    if (!employer_profile) return res.status(404).json({
        data: false,
        message: "employer profile not found!"
    })
    // Define an asynchronous function to handle the request to update a job listing by ID.
    const id = req.params.id
    // Get the job ID from the request parameters.
    const updatedFields = req.body;
    // Get the fields to be updated from the request body.
    const job = await JobListingModel.findById(id)
    // console.log(job);
    // Find the job listing in the database by its ID.
    if (!job) return res.status(404).json({
        message: "job not found!!"
    })
    // If the job is not found, respond with a status of 404 and an error message.
    try {
        const update_job = await JobListingModel.findByIdAndUpdate(id, {
            ...updatedFields,
            company_logo: employer_profile.company_logo,
            company_name: employer_profile.company_name,
        }, {
            runValidators: true,
            // new: true
        })
        // Update the job listing in the database with the provided fields, applying validators, and return the updated job.
        return res.status(200).json({
            message: `job updated!`,
            update_job
        });
        // Respond with a status of 200, a success message, and the updated job details.
    } catch (error) {
        return res.status(400).json({
            message: `job not updated!`,
        });
        // If an error occurs, respond with a status of 400 and an error message.
    }
}

// delete job
const handel_delete_job = async (req, res) => {
    // Define an asynchronous function to handle the request to delete a job listing by ID.
    const id = req.params.id
    // Get the job ID from the request parameters.
    try {
        const job = await JobListingModel.findById(id)
        // Find the job listing in the database by its ID.
        if (!job) return res.status(400).json({
            message: "job not found"
        })
        // If the job is not found, respond with a status of 400 and an error message.
        await job.deleteOne()
        // Delete the job listing from the database.
        return res.status(201).json({
            "message": "Job Deleted",
        })
        // Respond with a status of 201 and a success message indicating the job was deleted.
    } catch (error) {
        return res.status(400).json({
            "message": "Invalid request",
            "error": error.message
        })
        // If an error occurs, respond with a status of 400, an error message, and the specific error that occurred.
    }
}

async function insertJobs(req, res) {
    try {
        const docs = await JobListingModel.insertMany(req.body);
        return res.status(201).json({
            "message": req.body.length + " Jobs cretaed"
        })
    } catch (error) {
        return res.status(400).json({
            "message": "Jobs not created",
            "error": error.message
        })
    }
}



const handel_deletemany_jobs = async (req, res) => { // Import the JobListingModel

    // Define the condition for deleting job listings
    const condition = {
        user_id: req.user.user_id
    }

    // Use the deleteMany method to delete the matching job listings
    try {
        const jobs = await JobListingModel.deleteMany(condition)
        return res.status(200).json({
            message: `Deleted !`
        })
    } catch (error) {
        return res.status(400).json({
            message: 'Error deleting job listings:',
            error
        })
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