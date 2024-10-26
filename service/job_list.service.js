class JobListService {
    constructor(jobListModel, employerProfileModel) {
        this.jobListModel = jobListModel;
        this.employerProfileModel = employerProfileModel;
    };


    async getAllJobs(req) {
        const {
            job_type,
            city,
            job_title
        } = req.query;

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

                const jobs = await this.jobListModel.find(query);
                return {
                    total_jobs: jobs.length,
                    message: "all jobs!",
                    all_jobs: jobs
                };
            } catch (error) {
                throw new Error("jobs not found!");
            }
        };

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

            const allJobs = await this.jobListModel.find(query);
            // console.log(req.query)
            return {
                total_jobs: allJobs.length,
                all_jobs: allJobs
            };
        } catch (error) {
            throw new Error("Invalid request");
        };
    };

    async getJobById(req) {
        const id = req.params.id;

        try {
            const job = await this.jobListModel.findById(id);
            if (!job) return ({
                message: `Job not found with this id: ${id}`
            });

            return {
                job
            };
        } catch (error) {
            throw new Error("Invalid request");
        }
    }


    async createJob(req) {
        const employer_profile = await this.employerProfileModel.findOne({
            created_by: req.user.user_id
        });

        if (!employer_profile) throw new Error("employer profile not found!");

        try {
            const new_job = await new this.jobListModel(req.body);
            new_job.company_name = employer_profile.company_name;
            new_job.company_logo = employer_profile.company_logo;
            new_job.user_id = req.user.user_id;

            await new_job.save();

            return {
                "message": "Job created",
                job: new_job
            };

        } catch (error) {
            console.log(error);
            throw new Error("Invalid request");
        };
    }


    async updateJob(req) {
        const employer_profile = await this.employerProfileModel.findOne({
            created_by: req.user.user_id
        })

        if (!employer_profile) throw new Error("employer profile not found!");


        const id = req.params.id
        const updatedFields = req.body;
        const job = await this.jobListModel.findById(id)
        if (!job) throw new Error("job not found!!");

        try {
            const update_job = await this.jobListModel.findByIdAndUpdate(id, updatedFields, {
                runValidators: true,
                // new: true
            })
            return {
                message: `job updated!`,
                update_job
            };
        } catch (error) {
            throw new Error(`job not updated!`);
            // If an error occurs, respond with a status of 400 and an error message.
        }
    }


    async deleteJob(req) {
        const id = req.params.id
        try {
            const job = await this.jobListModel.findById(id)
            if (!job) throw new Error("job not found");
            await job.deleteOne();
            return {
                "message": "Job Deleted",
            };
        } catch (error) {
            throw new Error("Invalid request");
        }
    }

    async insertManyJobs(req) {
        try {
            const docs = await this.jobListModel.insertMany(req.body);
            return {
                "message": req.body.length + " Jobs cretaed"
            }
        } catch (error) {
            throw new Error("Jobs not created");
        };
    };

    async deleteManyJobs(req) {
        const condition = {
            user_id: req.user.user_id
        };
        try {
            const jobs = await this.jobListModel.deleteMany(condition)
            return {
                message: `Deleted !`
            };
        } catch (error) {
            throw new Error('Error deleting job listings')
        }
    }
}

module.exports = JobListService;