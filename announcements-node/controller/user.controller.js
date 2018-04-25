const {USER_ROLE, DBNAME, SECRET, USER_COLLECTION} = require('../shared/app-constants');
const DBService = require('../shared/db.service');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;
const userService = require('../service/user.service');

var nodemailer = require('nodemailer');
var accountSid = 'ACbdc6403769edfc193cc8cc9799def491';
var authToken = '1b514df52af8fbcb2dfd85bc05114c54';
const client = require('twilio')(accountSid, authToken);
const generator = require('generate-password');

/**
 * Function to register new user.
 * @param req
 * @param res
 */
exports.createUser = function (req, res) {

    try {
        let result = userService.createUser(req.body);
        if (result) {
            res.status(200).send({
                success: true,
                message: "New user registered",
            })
        } else {
            res.status(200).send({
                success: false,
                message: "Something went wrong. Please try again",
            })
        }
    } catch (error) {
        res.status(400).send({
            success: false,
            message: error.message,
        })
    }
};

//Function to verify the valid user while logging
exports.authenticateUser = function (req, res) {
    DBService.findOne({username: req.body.username}, DBNAME, 'users').then(function (userObject) {
        if (userObject) {
            if (userObject.password === req.body.password) {
                let token = jwt.sign({"user": userObject}, SECRET, {
                    expiresIn: "1d"
                });
                res.status(200).send({
                    success: true,
                    message: "User Authenticated",
                    payload: {
                        token,
                        userObject
                    }
                })
            } else {
                return res.status(500).send({
                    success: false,
                    message: 'Incorrect password'
                });
            }
        } else {
            return res.status(500).send({
                success: false,
                message: 'Incorrect username'
            });
        }
    });
};

//Code to delete the user
exports.deleteUser = function (req, res) {
    console.log('ID', req.params.id);
    DBService.deleteOne({_id: ObjectID(req.params.id)}, DBNAME, 'users').then(function (result) {
        if (result && result.result && result.deletedCount === 1) {
            res.status(200).send({
                success: true,
                message: "User Deleted",
            })
        } else {
            return res.status(500).send({
                status: 500,
                success: false,
                message: 'Unable to delete user'
            });
        }
    });
};

exports.resetPassword = async function (req, res) {
    if (req.body.email) {
        try {
            let result = await userService.forgotPassword(req.body.email);

            if (result) {
                res.status(200).send({
                    success: true,
                    message: "A temporary password has been sent to your registered email Id"
                });
            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: error.message
            });
        }
    } else {
        return res.status(400).send({
            success: false,
            message: 'Incorrect parameters passed'
        });
    }
};

exports.updateUser = async function (req, res) {
    if (req.params.id) {
        try {
            let result = await userService.updateUser(req.body, req.params.id);
            console.log('final', result);
            if (result) {
                res.status(200).send({
                    success: true,
                    payload: {userObject : result},
                    message: "User data updated successfully"
                });
            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: error.message
            });
        }
    } else {
        res.status(400).send({
            success: false,
            message: "Invalid parameters passed"
        });
    }
};

exports.getCredits = async function (req, res) {
    let credits = await userService.getCredits(req.header('x-access-token'));
    console.log("Credits", credits);
    if (credits) {
        res.status(200).send({
            success: true,
            payload: credits,
            message: 'Credits retrived'
        })
    }
};

exports.addCredits = async function (req, res) {
    if (req.body.credits) {
        let result = await userService.addCredits(req.body.credits, req.header('x-access-token'));

        if (result) {

            let credits = await userService.getCredits(req.header('x-access-token'));

            if (credits) {
                res.status(200).send({
                    success: true,
                    payload: credits,
                    message: 'Credits Added'
                })
            } else {
                res.status(400).send({
                    success: false,
                    message: 'Something went wrong. Please try again'
                })
            }
        }
    } else {
        res.status(400).send({
            success: false,
            message: 'Invalid parameters passed'
        })
    }
};