const mongoose = require('mongoose');
// Import the mongoose library, which is used to define schemas and interact with MongoDB.

const jobSeekerProfileSchema = new mongoose.Schema({
    // Define a new Mongoose schema for the job seeker profile, specifying the structure of the job seeker documents in the database.

    first_name: {
        type: String,
        required: true,
    },
    // Define a "first_name" field of type String, which is required.

    last_name: {
        type: String,
        required: true,
    },
    // Define a "last_name" field of type String, which is required.

    email: {
        type: String,
        required: true,
        unique: true,
        // match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
    },
    // Define an "email" field of type String, which is required, must be unique, and must match a regular expression pattern for valid email addresses.

    phone_number: {
        type: String,
        required: true,
        // match: [/^\d{10,15}$/, 'Please use a valid phone number.'],
    },
    // Define a "phone_number" field of type String, which is required and must match a regular expression pattern for valid phone numbers.

    city: {
        type: String,
        required: true,
    },
    // Define a "city" field of type String, which is required.

    state: {
        type: String,
        required: true,
    },
    // Define a "state" field of type String, which is required.

    country: {
        type: String,
        required: true,
    },
    // Define a "country" field of type String, which is required.

    education: {
        type: String,
        required: true,
    },
    // Define an "education" field of type String, which is required.

    previous_company: {
        type: String,
        required: true,
    },
    // Define a "previous_company" field of type String, which is required.

    employment_type: {
        type: String,
        required: true,
        enum: ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Internship'],
    },
    // Define an "employment_type" field of type String, which is required and must be one of the specified values (Full-time, Part-time, Contract, Temporary, Internship).

    profile_photo: {
        type: String,
        required: false,
        // Define a "profile_photo" field of type String, which is optional and can store the URL of the profile photo.
        // The match validation is commented out, so no validation is currently being performed on the URL format.
    },

    resume: {
        type: String,
        required: false,
        // Define a "resume" field of type String, which is optional and can store the URL of the resume.
        // The match validation is commented out, so no validation is currently being performed on the URL format.
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    }
    // Define a "user_id" field that stores a reference to the associated user in the usermodel collection. It uses the ObjectId type provided by Mongoose.

}, {
    timestamps: true
});
// Add a second argument to the schema definition, which enables automatic creation of "createdAt" and "updatedAt" timestamp fields.

const JobSeekerProfileModel = mongoose.model('JobSeekerProfile', jobSeekerProfileSchema);
// Create a Mongoose model named "JobSeekerProfile" based on the defined jobSeekerProfileSchema.
// This model will be used to interact with the "jobseekerprofiles" collection in the database.

module.exports = JobSeekerProfileModel;
// Export the JobSeekerProfile model so it can be used in other parts of the application.








