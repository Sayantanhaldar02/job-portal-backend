const mongoose = require("mongoose")
// Import the mongoose library, which is used to interact with MongoDB databases.

const db_connection = async (url) => {
  // Define an asynchronous function that takes a database connection URL as a parameter.
  try {
    await mongoose.connect(url, {
      serverSelectionTimeoutMS: 5000, // 5 seconds
      connectTimeoutMS: 10000, // 10 seconds
    })
    // Attempt to connect to the MongoDB database using the provided URL.
    console.log(`MongoDB connected!`)
    // If the connection is successful, log a success message to the console.
  } catch (error) {
    console.log(`Connection Error!`)
    // If an error occurs during the connection attempt, log a general connection error message.
    console.log(`Error: ${error}`)
    // Log the specific error that occurred to help with debugging.
  }
}

module.exports = db_connection
// Export the db_connection function so it can be used in other parts of the application.