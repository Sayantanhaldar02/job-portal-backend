const {
    response
} = require('express');
const UserAuthModel = require('../models/user_auth.model');
const UserAuthService = require('../service/user_auth.service');

const userAuthService = new UserAuthService(UserAuthModel);

// register user handler
const handel_register_user = async (req, res) => {
    try {
        const response = await userAuthService.userRegister(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const handel_login_user = async (req, res) => {
    try {
        const response = await userAuthService.userLogin(req, res);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

const handel_logout_user = (req, res) => {
    const response = userAuthService.userLogout(res);
    return res.status(200).json(response);
}


const handel_get_all_user = async (req, res) => {
    try {
        const response = await userAuthService.getAllUser();
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

module.exports = {
    // Export the functions so they can be used in other parts of the application.
    handel_register_user,
    handel_login_user,
    handel_get_all_user,
    handel_logout_user
}