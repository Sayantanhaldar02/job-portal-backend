const mongoose = require("mongoose")
// Import the mongoose library, which is used to define schemas and interact with MongoDB.

const userSchema = new mongoose.Schema({
    // Define a new Mongoose schema for the user model, specifying the structure of the user documents in the database.

    email: {
        type: String,
        require: true,
        unique: true
    },
    // Define an "email" field of type String, which is required and must be unique (no two users can have the same email).

    password: {
        type: String,
        require: true
    },
    // Define a "password" field of type String, which is required.

    role: {
        type: String,
        enum: ['jobseeker', 'employer'],
        default: "jobseeker"
    }
    // Define a "role" field of type String, which can only have one of two values: 'jobseeker' or 'employer'.
    // The default value is set to 'jobseeker' if no role is provided.

}, {
    timestamps: true
})
// Add a second argument to the schema definition, which enables automatic creation of "createdAt" and "updatedAt" timestamp fields.

const UserAuthModel = mongoose.model("usermodel", userSchema);
// Create a Mongoose model named "usermodel" based on the defined userSchema. 
// This model will be used to interact with the "usermodels" collection in the database.

module.exports = UserAuthModel;
// Export the UserAuthModel so it can be used in other parts of the application.