const {USER_ROLE, DBNAME, SECRET} = require('../shared/app-constants');
const DBService = require('../shared/db.service');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;


exports.createUser = function (req, res) {
    console.log(req.body);
    let userInfo = {
        username: req.body.username,
        password: req.body.password,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        phone: req.body.phone,
        role: USER_ROLE
    };

    DBService.insertOne(userInfo, DBNAME).then(function () {
        console.log('User added Successfully');
        res.json({status:200, success: true, message: `User ${userInfo.username} registered.`});
    }).catch(function (error) {
        console.log('Unable to add user', error);
        res.status(400).json({status: 400, message: error.message})
    })
};

exports.authenticateUser = function (req, res) {
    DBService.findOne({username: req.body.username}, DBNAME, 'users').then(function (userObject) {
        if (userObject) {
            if (userObject.password === req.body.password) {
                let token = jwt.sign({"username": userObject.username, "password": userObject.password}, SECRET, {
                    expiresIn: "1d"
                });
                console.log(token);
                res.send({
                    success: true,
                    message: "User Authenticated",
                    token: token,

                })
            } else {
                return res.status(500).send({
                    status: 500,
                    success: false,
                    message: 'Incorrect password'
                });
            }
        } else {
            return res.status(500).send({
                status: 500,
                success: false,
                message: 'Incorrect username'
            });
        }
    });
};

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