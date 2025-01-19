import bcrypt from "bcryptjs/dist/bcrypt";
import { validationResult } from "express-validator";
import SibApiV3Sdk from 'sib-api-v3-sdk';
import jwt from "jsonwebtoken";
import gravatar from "gravatar";

import { logger } from "../util/logger";
import { userController } from "../service/user";
import { roleController } from "../service/role";


// Default Mail Client to Send Mail
const defaultClient = SibApiV3Sdk.ApiClient.instance;
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SIB_API_KEY;


// Register Controller
/**
 * This api will save the user details in the database and will send an activation token to the user for verification
 * @param {name, email, aadhar, password} req 
 * @param {} res 
 * @returns --> Email will be sent to respective email for further activation
 */
export const registerController = async(req, res) => {
    logger.info(`Registration api has been called`);
    const {name, email, aadhar} = req.body;

    const password = bcrypt.hashSync(req.body.password, 10);
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0];
        return res.status(422).json({
            error: firstError,
        })
    }

    const user = await userController.userExist(email);
    if (user) {
        return res.status(409).json({
            error: "Email is taken",
        });
    }

    var role = await roleController.getRole({role: "PATIENT"});
    if(role == undefined || role == null){
        role = await roleController.createRole("PATIENT");
    }
    const avatar = gravatar.url(email, {
        s: '200',
        r: 'pg',
        d: 'mm'
    });

    const userBody = {
        name,
        email,
        password,
        aadhar,
        role,
        avatar
    }

    const registered_user = await userController.createUser(userBody);
    if (!registered_user) {
        logger.error("Not able to sign Up.");
        return res.status(400).json({
            error: "Some Internal Error Occured. Not able to sign Up at this moment. Please try again."
        })
    }
    logger.info("Registration Successful");
    logger.info({name, email});

    const token = jwt.sign({
        name,
        email
    }, process.env.JWT_ACTIVATION_SECRET, {
        expiresIn: "30m"
    })
    await userController.updateOne(registered_user.id, {activationLink: token});
    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let emailData = new SibApiV3Sdk.SendSmtpEmail();

    emailData.subject = `Activation Mail for verification`;
    emailData.sender = { "name": `${process.env.CLIENT_NAME}`, "email": `${process.env.SENDER_MAIL}` };
    emailData.to = [{ "name": name, "email": email }];
    emailData.htmlContent = `
            <h1>Please Click on this link to activate</h1>
            <p>${process.env.CLIENT_URL}/users/activate/${token}</p>
            <hr/>
            <p>This email contain sensitive info</p>
            <p>${process.env.CLIENT_URL}</p>
        `;

    apiInstance.sendTransacEmail(emailData).then(sent => {
        return res.status(200).json({
            msg: `Activation Email has been sent to ${email}. Please activate your account`,
        });
    }).catch(err => {
        logger.error(err);
        return res.status(422).json({
            error: err.body.message
        });
    })
}

// Activate User
export const activationController = async(req, res) => {
    logger.info("Activation Controller Called");
    const { token } = req.body;
    if(!token){
        logger.error("No token provided");
        return res.status(401).json({
            error: "No token Provided. Please enter a valid activation token."
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_ACTIVATION_SECRET);
        logger.info(decoded);
        const {email} = decoded;
        const user = await userController.userExist(email);
        if(user == undefined || user == null){
            return res.status(404).json({
                error: "User doesn't exist with the following email. Kindly sign up."
            });
        }

        if(token != user.activationLink){
            logger.error("Invalid Activation Token");
            return res.status(422).json({
                error: "Invalid Activation Token"
            });
        }

        if(user.activated == "YES"){
            return res.status(400).json({
                error: "Already activated. Please login."
            });
        }
        user.activated = "YES"
        user.activationLink = undefined;
        const data = user.save();
        if (!data) {
            logger.error("Not able to activate the account");
            return res.status(400).json({
                error: "Database connection error on user Activation"
            })
        }

        return res.status(200).json({
            message: "Activation Successful. Please login."
        });
    } catch (err) {
        logger.error(`${err.name} --> ${err.message}`);
        return res.status(400).json({
            error: err.message
        })
    }
}

// Login Controller
export const loginController = async(req, res) => {
    logger.info("Login Controller Called");
    const {email, password} = req.body;

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error(errors);
        const firstError = errors.array().map(error => error.msg)[0]
        return res.status(422).json({
            error: firstError,
        });
    }

    const user = await userController.userExist(email);
    if(!user){
        return res.status(400).json({
            error: "Invalid Credentials"
        })
    }
    if(user.activated == "NO"){
        return res.status(400).json({
            error: "User is not verified. Please verify your email."
        })
    }
    const validPass = await bcrypt.compareSync(password, user.password);
    if (!validPass) return res.status(400).json({ error: "Invalid Credentials" });
    const token = jwt.sign({
        name: user.name,
        id: user._id,
    }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
    const role = await roleController.getRole({ _id: user.role });
    
    return res.status(200).json({
        message: "Login Successful",
        token,
        role: role.role
    });
}

// Forget Password Link Generator
export const forgetController = async(req, res) => {
    logger.info("Forget Controller Called");
    const { email } = req.body;

    const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
    let emailData = new SibApiV3Sdk.SendSmtpEmail();

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        logger.error(firstError);
        return res.status(422).json({
            error: firstError,
        });
    }

    const user = await userController.userExist(email);
    if (!user) {
        logger.error("User does not exist");
        return res.status(400).json({
            error: 'User does not exist with this email.'
        });
    }

    const token = jwt.sign({
        email,
    }, process.env.JWT_RESET_PASSWORD, {
        expiresIn: '10m'
    });

    // Email Sending
    emailData.subject = `Password Reset Link`;
    emailData.sender = { "name": `${process.env.CLIENT_NAME}`, "email": `${process.env.SENDER_MAIL}` };
    emailData.to = [{ "name": user.name, "email": email }];
    emailData.htmlContent = `
        <h1>Please Click on this link to reset your password</h1>
        <p>${process.env.CLIENT_URL}/users/password/reset/${token}</p>
        <hr/>
        <p>This email contain sensitive info</p>
        <p>${process.env.CLIENT_URL}</p>
    `

    // Update the user password reset link
    const data = await user.updateOne({
        resetPasswordLink: token
    });

    if (!data) {
        logger.error("Not able to set the resetLink in the database");
        return res.status(400).json({
            error: "Database connection error on user password forget request"
        })
    }

    apiInstance.sendTransacEmail(emailData).then(sent => {
        logger.info(sent);
        return res.json({
            msg: `Email has been sent to ${email}`,
        });
    }).catch(err => {
        logger.error(err)
        return res.status(400).json({
            error: err.body.message
        });
    });
}

// Reset Password Controller
export const resetPasswordController = async(req, res) => {
    logger.info("Reset Password Controller Called");
    const { token, newPassword } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const firstError = errors.array().map(error => error.msg)[0]
        logger.error(firstError);
        return res.status(422).json({
            error: firstError,
        });
    }

    if(!token){
        logger.error("No token provided");
        return res.status(401).json({
            error: "No token Provided. Please enter a valid reset token."
        });
    }

    try {
        const decoded = await jwt.verify(token, process.env.JWT_RESET_PASSWORD);
        logger.info(decoded);
        const {email} = decoded;
        const user = await userController.userExist(email);
        if(user == undefined || user == null){
            return res.status(404).json({
                error: "User doesn't exist with the following email. Please sign up."
            });
        }

        if(token != user.resetPasswordLink){
            logger.error("Invalid Reset Password Token");
            return res.status(422).json({
                error: "Invalid Reset Password Token"
            });
        }


        const samePass = await bcrypt.compareSync(newPassword, user.password);
        // Check if new password same as new password
        if(samePass){
            logger.error("New Password cant be same as old password");
            return res.status(422).json({
                error: "New Password can't be same as old password"
            });
        }

        const password = bcrypt.hashSync(newPassword, 10);
        // Update the password
        user.password = password;
        user.resetPasswordLink = undefined;
        const data = await user.save();

        if (!data) {
            logger.error("Not able to set the password in the database");
            return res.status(400).json({
                error: "Database connection error on user password reset request"
            })
        }

        return res.status(200).json({
            message: "Password successfully updated."
        });
    } catch (err) {
        logger.error(`${err.name} --> ${err.message}`);
        return res.status(400).json({
            error: err.message
        })
    }

}