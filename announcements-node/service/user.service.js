const DBService = require('../shared/db.service');
const {DBNAME, USER_COLLECTION} = require('../shared/app-constants');
const mailer = require('../shared/mailer.service');
const generator = require('generate-password');

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

                if (updateStatus.ok === 1) {
                    return true;
                }

            }

        } else {
            throw new Error("This email Id is not registered with us. Please enter the correct one");
        }

    } catch (err) {
        throw err;
    }
};