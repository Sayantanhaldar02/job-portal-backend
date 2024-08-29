const express = require("express");
// Import the Express library, which is used to create the application and handle routing.

const {
    handel_register_user,
    handel_login_user,
    handel_get_all_user,
    handel_logout_user
} = require("../controller/user_auth.controller");
// Import the handler functions for user authentication from the user_auth.controller file.

const router = express.Router();
// Create a new Express Router instance to define the routes for user authentication.

router.post("/register", handel_register_user);
// Define a POST route for the path "/register".
// This route calls the `handel_register_user` function to handle user registration.

router.post("/login", handel_login_user);
// Define a POST route for the path "/login".
// This route calls the `handel_login_user` function to handle user login.

router.get("/all-users", handel_get_all_user);
// Define a GET route for the path "/all-users".
// This route calls the `handel_get_all_user` function to retrieve a list of all users.

router.post("/logout", handel_logout_user);


module.exports = {
    userAuthRouter: router
};
// Export the router as `userAuthRouter`, so it can be used in other parts of the application.
