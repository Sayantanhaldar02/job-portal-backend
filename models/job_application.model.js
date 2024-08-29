const mongoose = require("mongoose")

const jobApplicationSchema = new mongoose.Schema({
    job_title: {
        type: String,
        require: true,
    },
    job_location: {
        type: String,
        require: true,
    },
    job_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'joblistingmodel',
    },
    employer_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'joblistingmodel',
    },
    company_name: {
        type: String,
        require: true,
    },
    salary: {
        type: Number,
        require: true,
    },
    first_name: {
        type: String,
        require: true,
    },
    last_name: {
        type: String,
        require: true,
    },
    email: {
        type: String,
        require: true,
    },
    phone_number: {
        type: String,
        require: true,
    },
    phone_number: {
        type: String,
        require: true,
    },
    resume: {
        type: String,
        require: true,
    },
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        require: true,
        ref: 'usermodel',
    },
    status:{
        type:String,
        enum:['profile_view','view_resume','pending','accepted','rejected'],
        default:"pending"
    }
}, {
    timestamps: true
})

const JobApplicationModel = mongoose.model("jobapplicationmodel", jobApplicationSchema);

module.exports = JobApplicationModel;