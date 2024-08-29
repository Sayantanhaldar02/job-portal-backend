const {
    generateValue
} = require("../service/auth.service");
// Import the generateValue function from the auth service. This function is likely used to decode or verify the token and extract user information.

const checkAuthentication = (req, res, next) => {
    const authHeader = req.headers["authorization"];
    // console.log(`Auth-header: ${authHeader}`);
    if (!authHeader) {
        return next()
    }
    token = authHeader.split(' ')[1];
    // console.log(`Token: ${token}`);
    const user_value = generateValue(token)
    req.user = user_value
    // console.log(`Token value: ${JSON.stringify(req.user)}`);
    return next()
}

const authenticateTo = (roles = []) => {
    // Define a middleware function that checks if the authenticated user has one of the specified roles. The function takes an array of roles as an argument.
    // console.log(roles);
    return (req, res, next) => {
        // Return a middleware function that performs the role-based authorization check.
        // console.log(req.user.role);
        if (!req.user) return res.status(401).json({
            message: "user not authenticate!"
        })
        // If there is no authenticated user (req.user is undefined), respond with a 401 status and an error message indicating the user is not authenticated.
        if (!roles.includes(req.user.role)) return res.status(403).json({
            message: "user not authorized to access this resource!"
        })
        // If the user's role is not included in the allowed roles, respond with a 403 status and an error message indicating the user is not authorized.
        return next()
        // If the user is authenticated and authorized, call next() to pass control to the next middleware or route handler.
    }
}

module.exports = {
    checkAuthentication,
    authenticateTo
}
// Export the checkAuthentication and authenticateTo functions so they can be used in other parts of the application.















// header based authentication
// const checkAuthentication = (req, res, next) => {
//     // Define a middleware function to check if the user is authenticated by verifying the token in the cookies.
//     const token_cookie = req.cookies.authToken
//     // Retrieve the 'authToken' cookie from the incoming request.
//     // console.log(`Cookie: ${token_cookie}`);
//     if (!token_cookie) return next()
//     // If the token does not exist, call next() to pass control to the next middleware or route handler.
//     const user_value = generateValue(token_cookie)
//     // Use the generateValue function to extract user information from the token.
//     req.user = user_value
//     // Assign the extracted user information to the req.user property, making it accessible in subsequent middleware or route handlers.
//     // console.log(`Token value: ${JSON.stringify(req.user)}`);
//     return next()
//     // Call next() to pass control to the next middleware or route handler after the user has been authenticated.
// }


// role based authorization
// const authenticateTo = (roles=[]) => {
//     // console.log(roles);
//     return (req, res, next) => {
//         // console.log(req.user.role);
//         if(!req.user){
//             return res.status(401).json({
//                 message:"user not authenticate"
//             })
//         }

//         if(!roles.includes(req.user.role)){
//             return res.status(403).json({
//                 message:"user not authorized to access this resource"
//             })
//         }
//         return next()
//     }
// }