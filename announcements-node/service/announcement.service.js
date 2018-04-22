const mailer = require('../shared/mailer.service');

exports.createAnnouncement = async function createAnnouncement(content){
    try {
        let config =  mailer.createMailConfiguration('karanracca@gmail.com', "Testing", "", content);

        let mail = await mailer.sendMail(config);

        console.log(mail);

        return {
            accepted: mail.accepted,
            rejected: mail.rejected
        }
    } catch (error) {
        throw error;
    }
};