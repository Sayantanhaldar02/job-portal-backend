const mongoose = require("mongoose")
// Import the mongoose library, which is used to define schemas and interact with MongoDB.

const jobListingSchema = new mongoose.Schema({
    // Define a new Mongoose schema for the job listing, specifying the structure of the job listing documents in the database.

    job_title: {
        type: String,
        require: true
    },
    // Define a "job_title" field of type String, which is required.
    company_name: {
        type: String,
        require: true
    },
    vacancy: {
        type: Number,
        require: true
    },
    experience: {
        type: String,
        require: true
    },
    company_logo: {
        type: String,
        require: true
    },
    job_type: {
        type: String,
        require: true,
        enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    },
    skills: {
        type: String,
        require: true
    },
    description: {
        type: String,
        require: true
    },
    // Define a "description" field of type String, which is required.

    qualifications: {
        type: String,
        require: true
    },
    // Define a "qualifications" field of type String, which is required.

    responsibilities: {
        type: String,
        require: true,
    },
    // Define a "responsibilities" field of type String, which is required.

    city: {
        type: String,
        require: true
    },
    // Define a "city" field of type String, which is required.

    state: {
        type: String,
        require: true
    },
    // Define a "state" field of type String, which is required.

    country: {
        type: String,
        require: true
    },
    // Define a "country" field of type String, which is required.

    salary_range: {
        type: String,
        require: true
    },
    // Define a "salary_range" field of type String, which is required.

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    },
    // Define a "user_id" field that stores a reference to the associated user in the "usermodel" collection. 
    // It uses the ObjectId type provided by Mongoose.

}, {
    timestamps: true
})
// Add a second argument to the schema definition, which enables automatic creation of "createdAt" and "updatedAt" timestamp fields.

const JobListingModel = mongoose.model("joblistingmodel", jobListingSchema)
// Create a Mongoose model named "joblistingmodel" based on the defined jobListingSchema. 
// This model will be used to interact with the "joblistingmodels" collection in the database.

module.exports = JobListingModel
// Export the JobListingModel so it can be used in other parts of the application.




