class JobApplicationService {
    constructor(jobApplicationModel, jobListModel, jobSeekerProfileModel) {
        this.jobApplicationModel = jobApplicationModel;
        this.jobListModel = jobListModel;
        this.jobSeekerProfileModel = jobSeekerProfileModel;
    }

    async applyForJob(req) {
        const jobID = req.params.id;
        const job = await this.jobListModel.findById(jobID)
        const user = await this.jobSeekerProfileModel.findOne({
            user_id: req.user.user_id
        });

        try {
            const new_applicant = await new this.jobApplicationModel({
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
            });
            await new_applicant.save();
            return {
                message: "applied!",
                new_applicant
            };
        } catch (error) {
            throw new Error("Applied Failed!");
        }
    };

    async applicationStatusUpdate(req) {
        try {
            const application_id = req.params.id;
            const application = await this.jobApplicationModel.findById(application_id);
            if (!application) throw new Error("Application not found");
            await this.jobApplicationModel.findByIdAndUpdate(application_id, {
                status: req.body.status
            }, {
                runValidators: true,
            })
            return {
                message: "Application status updated successfully",
                application
            };
        } catch (error) {
            throw new Error("Failed to update application status");
        }
    }

    async getApplicationForEmployer(req) {
        try {
            const all_job_application = await this.jobApplicationModel.find({
                employer_id: req.user.user_id
            })
            return {
                message: "all job application!",
                all_job_application
            };
        } catch (error) {
            throw new Error("Application not found!");
        };
    };

    async getApplicationForJobSeeker(req) {
        try {
            const all_job_application = await this.jobApplicationModel.find({
                user_id: req.user.user_id
            })
            return {
                message: "all job application!",
                all_job_application
            };
        } catch (error) {
            throw new Error("Applications not found!");
        };
    };

};


module.exports = JobApplicationService;