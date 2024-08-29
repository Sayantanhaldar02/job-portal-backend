const bcrypt = require('bcrypt'); 
// Import the bcrypt library, which is used to hash passwords and compare hashed passwords.

const UserAuthModel = require('../models/user_auth.model'); 
// Import the UserAuthModel, which is used to interact with the user authentication data in the database.

const { set_user, generateToken } = require('../service/auth.service'); 
// Import the set_user and generateToken functions from the auth service. These functions are used to set user data and generate authentication tokens.

const saltRounds = 10; 
// Define the number of salt rounds for hashing passwords. The higher the number, the more secure the hash, but it also requires more computational power.


// register user handler
const handel_register_user = async (req, res) => { 
    // Define an asynchronous function to handle the request to register a new user.
    const user = await UserAuthModel.findOne({email: req.body.email})
    if (user) return  res.status(400).json({message:"User already registered!!"})
    try {
        // using bcrypt library to hash the user password
        bcrypt.hash(req.body.password, saltRounds, async function (err, hash) { 
            // Hash the user's password using bcrypt with the specified number of salt rounds.
            const newUser = await new UserAuthModel({
                email: req.body.email,
                password: hash,
                role: req.body.role
            })
            // Create a new instance of UserAuthModel with the user's email, hashed password, and role.
            
            // save user
            await newUser.save() 
            // Save the new user to the database.
            
            // send response
            return res.status(201).json({
                message: "User created",
                user: newUser
            })
            // Respond with a status of 201, a success message, and the newly created user.
        });
    } catch (error) {
        // send error
        return res.status(400).json({
            message: "User not created",
            error: error.message
        })
        // If an error occurs, respond with a status of 400, an error message, and the specific error that occurred.
    }
}

const handel_login_user = async (req, res) => { 
    // Define an asynchronous function to handle the request to log in a user.
    try {
        const user = await UserAuthModel.findOne({ email: req.body.email }) 
        // Find a user in the database by their email address.
        if (!user) return res.status(400).json({ message: "User not found" }) 
        // If the user is not found, respond with a status of 400 and an error message.

        // using bcrypt.compare method to compare the user given password and user's original password
        bcrypt.compare(req.body.password, user.password, function (err, result) { 
            // Compare the provided password with the stored hashed password using bcrypt.
            if (!result) {
                // if password is incorrect, send an error response
                return res.status(400).json({
                    message: "Password not matched"
                })
                // If the password does not match, respond with a status of 400 and an error message.
            }

            // if user is valid, then we generate a token
            const token = generateToken(user) 
            // Generate an authentication token for the valid user.
            // console.log(token)
            // after generating the token we set the token value to cookies
            res.cookie('authToken', token,{
                httpOnly: true, // Prevent JavaScript access
                secure: true, // Only transmit over HTTPS
                maxAge: 3600000 // Cookie expires after 1 hour
              }) 
            // Set the generated token in a cookie named 'authToken'.

            // send a successful message after user successfully login
            return res.status(200).json({
                message: "Valid user",
                token
            })
            // Respond with a status of 200, a success message, and the generated token.
        })

    } catch (error) {
        return res.status(400).json({
            message: "Not valid user"
        })
        // If an error occurs, respond with a status of 400 and an error message indicating the user is not valid.
    }
}

const handel_logout_user = (req, res) => {  
    // Define a function to handle the request to log out a user.
    res.clearCookie('authToken') 
    // Clear the authentication token cookie.
    return res.status(200).json({
        message: "User logged out"
    })
    // Respond with a status of 200 and a success message indicating that the user has been logged out.
}


const handel_get_all_user = async (req, res) => { 
    // Define an asynchronous function to handle the request to get all users.
    try {
        const users = await UserAuthModel.find() 
        // Find all users in the database.
        // console.log(users) 
        // Log the list of users to the console (primarily for debugging purposes).
        return res.status(200).json({
            users
        })
        // Respond with a status of 200 and the list of all users.
    } catch (error) {
        return res.status(400).json({
            error: "User Found"
        })
        // If an error occurs, respond with a status of 400 and an error message.
    }
}

module.exports = { 
    // Export the functions so they can be used in other parts of the application.
    handel_register_user,
    handel_login_user,
    handel_get_all_user,
    handel_logout_user
}
