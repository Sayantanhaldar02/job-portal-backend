const bcrypt = require('bcrypt');
const {
    generateToken
} = require('./auth.service');

class UserAuthService {
    constructor(userAuthModel) {
        this.userAuthModel = userAuthModel;
    };


    async userRegister(req) {
        const saltRounds = 10;
        const user = await this.userAuthModel.findOne({
            email: req.body.email
        });

        if (user) throw new Error("User already registered!!");

        try {

            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds);
            // console.log(hashedPassword);
            const newUser = new this.userAuthModel({
                email: req.body.email,
                password: hashedPassword,
                role: req.body.role
            });
            await newUser.save();
            return {
                message: "User created",
                user: newUser
            };
        } catch (error) {
            throw new Error("User not created");
        };
    };

    async userLogin(req) {
        const user = await this.userAuthModel.findOne({
            email: req.body.email
        });

        if (!user) throw new Error("User not found");

        const isMatch = await bcrypt.compare(req.body.password, user.password);
        if (!isMatch) {
            throw new Error("Password not matched");
        };
        const token = generateToken(user);

        return {
            message: "Valid user",
            token
        };
    };

    userLogout(res) {
        res.clearCookie('authToken');
        return {
            message: "User logged out",
        };
    };

    async getAllUser() {
        try {
            const users = await this.userAuthModel.find();
            return {
                message: "All users",
                users
            };
        } catch (error) {
            throw new Error("Users Not Found");
        };
    };
};

module.exports = UserAuthService;