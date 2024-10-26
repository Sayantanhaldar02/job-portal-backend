const EmployerProfileModel = require("../models/employer_profile.model");
const EmployerProfileService = require("../service/employer_profile.service");

const employerProfileService = new EmployerProfileService(EmployerProfileModel);


// Create employer profile
const handel_create_employer_profile = async (req, res) => {
    try {
        const response = await employerProfileService.createProfile(req);
        return res.status(201).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

// Get employer profile
const handel_get_employer_profile = async (req, res) => {
    try {
        const response = await employerProfileService.getProfile(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}

// Update employer profile
const handel_update_employer_profile = async (req, res) => {
    try {
        const response = await employerProfileService.updateProfile(req);
        // console.log(response);
        return res.status(200).json(response);
    } catch (error) {
        // console.log(error)
        return res.status(400).json(error.message);
    }
}

// Delete employer profile
const handel_delete_employer_profile = async (req, res) => {
    try {
        const response = await employerProfileService.deleteProfile(req);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(400).json(error.message);
    }
}


module.exports = {
    handel_create_employer_profile,
    handel_get_employer_profile,
    handel_update_employer_profile,
    handel_delete_employer_profile,
}