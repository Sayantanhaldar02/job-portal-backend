const mongoose = require("mongoose")
// Import the mongoose library, which is used to define schemas and interact with MongoDB.

const testSchema = new mongoose.Schema({
    // Define a new Mongoose schema for the job listing, specifying the structure of the job listing documents in the database.

    com_image: {
        type: String,
    },
    // Define a "job_title" field of type String, which is required.
    company_name: {
        type: String,
    },

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "usermodel"
    },
}, {
    timestamps: true
})
// Add a second argument to the schema definition, which enables automatic creation of "createdAt" and "updatedAt" timestamp fields.

const TestModel = mongoose.model("test", testSchema)
// Create a Mongoose model named "joblistingmodel" based on the defined jobListingSchema. 
// This model will be used to interact with the "joblistingmodels" collection in the database.

module.exports = TestModel
// Export the JobListingModel so it can be used in other parts of the application.




