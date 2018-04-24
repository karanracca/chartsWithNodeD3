const DBService = require('../shared/db.service');
const {DBNAME, USER_COLLECTION} = require('../shared/app-constants');
const mailer = require('../shared/mailer.service');
const generator = require('generate-password');
const ObjectID = require('mongodb').ObjectID;
const common = require('./common.service');

exports.forgotPassword = async function (email) {

    try {

        let userObject = await DBService.findOne({email: email}, DBNAME, USER_COLLECTION);

        console.log("User Object", userObject);

        if (userObject) {

            let password = generator.generate({length: 8, numbers: true});

            let result = await mailer.sendMail(mailer.createMailConfiguration(email, 'New Password for Charts', `Your new password is ${password}`));

            console.log("Result", result.accepted.length === 1);

            if (result) {
                let updateStatus = await DBService.findOneAndUpdate(
                    {email: email},
                    DBNAME,
                    USER_COLLECTION,
                    {$set: {password: password}}
                );

                console.log('Update Status', updateStatus);

                if (updateStatus.ok === 1) return true;
            }
        } else {
            throw new Error("This email Id is not registered with us. Please enter the correct one");
        }
    } catch (err) { throw err };
};

exports.updateUser =  async function (user, id) {

    try {
        let updatedUser = {
            username: user.username,
            password: user.password,
            firstName: user.firstname,
            lastName: user.lastname,
            email: user.email,
            phone: user.phone,
            role: user.role,
            credits: user.credits
        };

        let result = await DBService.replaceOne({_id: ObjectID(id)}, DBNAME, USER_COLLECTION, updatedUser);
        console.log("Outside", result);
        if (result.ok === 1) {
            console.log("Inside");
            let userData = await DBService.findOne({_id: ObjectID(id)}, DBNAME, USER_COLLECTION);
            console.log('userData', userData);
            if (userData) {
                return userData;
            } else {
                throw new Error("Updated user not found");
            }
        } else {
            throw new Error("Unable to update user details");
        }
    } catch (error) {
        throw error;
    }

};

exports.getCredits = async function (token) {
    try {
        let userInfo = await common.decodeToken(token);
        console.log(userInfo);
        let result = await DBService.findOne({_id: ObjectID(userInfo.user._id)}, DBNAME, USER_COLLECTION);
        console.log(result);
        return result.credits;

    } catch (error) {
        throw error;
    }
};