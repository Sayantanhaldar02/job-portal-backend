const JWT = require("jsonwebtoken");
// Import the jsonwebtoken library for creating and verifying JSON Web Tokens (JWT).
require('dotenv').config();
const secretKey = process.env.JWT_SECRET_KEY;
// Define a secret key used for signing and verifying JWTs. This should be kept secure and not hardcoded in production.

function generateToken(user) {
    // Define a function to generate a JWT for a given user.

    const payload = {
        user_id: user._id,
        email: user.email,
        role: user.role
    };
    // Create the payload for the JWT. This typically includes user information that will be encoded in the token.

    return JWT.sign(payload, secretKey);
    // Sign the payload with the secret key and return the generated token.
}

function generateValue(token) {
    // Define a function to decode and verify a JWT.

    if (!token) return null;
    // If no token is provided, return null.

    return JWT.verify(token, secretKey);
    // Verify the token using the secret key and return the decoded payload. If the token is invalid or expired, this will throw an error.
}

module.exports = {
    generateToken,
    generateValue
};
// Export the `generateToken` and `generateValue` functions so they can be used in other parts of the application.