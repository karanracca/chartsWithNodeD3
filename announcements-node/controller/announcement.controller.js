const {USER_ROLE, DBNAME, SECRET, USER_COLLECTION} = require('../shared/app-constants');
const announceService = require('../service/announcement.service');

exports.createAnnouncement = function (req, res) {
    if (req.body.editorContent) {
        console.log(req.body.editorContent);
        announceService.createAnnouncement(req.body.editorContent);
    } else {
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
        })
    }
};