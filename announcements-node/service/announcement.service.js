const mailer = require('../shared/mailer.service');
const DBService = require('../shared/db.service');
const common = require('../service/common.service');
const ObjectID = require('mongodb').ObjectID;
const {DBNAME, CHARTS_COLLECTION, USER_COLLECTION} = require('../shared/app-constants');

exports.createAnnouncement = async function createAnnouncement(content, receivers, token) {
    try {
        let config = mailer.createMailConfiguration(receivers, "New Announcement from Charts", "", content);

        let mail = await mailer.sendMail(config);

        if (mail.rejected.length === 0) {
            //Save Data in DB
            //Reduce credits
            if( await this.reduceCredits(token)) {
                return {
                    accepted: mail.accepted,
                    rejected: mail.rejected
                }
            }
        }
    } catch (error) {
        throw error;
    }
};

exports.reduceCredits = async function (token) {
    try {
        let userInfo = await common.decodeToken(token);

        let user = await DBService.findOne({_id: ObjectID(userInfo.user._id)}, DBNAME, USER_COLLECTION);

        console.log(user);

        let result = await DBService.findOneAndUpdate({_id: ObjectID(userInfo.user._id)}, DBNAME, USER_COLLECTION, {$inc: {credits: -1}})

        if (result.ok === 1) {
            return true;
        } else {
            return false;
        }


    } catch (error) {
        console.log(error);
    }
};