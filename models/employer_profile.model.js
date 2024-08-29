const mongoose = require('mongoose');
// Import the mongoose library, which is used to define schemas and interact with MongoDB.

const employerProfileSchema = new mongoose.Schema({
  // Define a new Mongoose schema for the employer profile, specifying the structure of the employer documents in the database.

  company_name: {
    type: String,
    // required: true,
  },
  // Define a "company_name" field of type String, which is required.

  company_city: {
    type: String,
    // required: true,
  },
  // Define a "company_city" field of type String, which is required.

  company_state: {
    type: String,
    // required: true,
  },
  // Define a "company_state" field of type String, which is required.

  company_country: {
    type: String,
    // required: true,
  },
  // Define a "company_country" field of type String, which is required.

  company_website: {
    type: String,
    required: false,
    match: [/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/, 'Please use a valid URL.'],
  },
  // Define a "company_website" field of type String, which is optional.
  // If provided, it must match a regular expression pattern for valid URLs.

  contact_name: {
    type: String,
    // required: true,
  },
  // Define a "contact_name" field of type String, which is required.

  contact_email: {
    type: String,
    // required: true,
    // match: [/^\S+@\S+\.\S+$/, 'Please use a valid email address.'],
  },
  // Define a "contact_email" field of type String, which is required.
  // It must match a regular expression pattern for valid email addresses.

  contact_phone_number: {
    type: String,
    // required: true,
    // match: [/^\d{10,15}$/, 'Please use a valid phone number.'],
  },
  // Define a "contact_phone_number" field of type String, which is required.
  // It must match a regular expression pattern for valid phone numbers.
  company_logo:{
    type: String,
    required: false,
    // Define a "company_logo" field of type String, which is optional.
  },
  created_by: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "usermodel"
  }
  // Define a "created_by" field that stores a reference to the associated user in the "usermodel" collection.
  // It uses the ObjectId type provided by Mongoose.

}, {
  timestamps: true
});
// Add a second argument to the schema definition, which enables automatic creation of "createdAt" and "updatedAt" timestamp fields.

const EmployerProfileModel = mongoose.model('EmployerProfileModel', employerProfileSchema);
// Create a Mongoose model named "EmployerProfileModel" based on the defined employerProfileSchema.
// This model will be used to interact with the "employerprofilemodels" collection in the database.

module.exports = EmployerProfileModel;
// Export the EmployerProfileModel so it can be used in other parts of the application.