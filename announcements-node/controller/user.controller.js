const {USER_ROLE, DBNAME, SECRET} = require('../shared/app-constants');
const DBService = require('../shared/db.service');
const jwt = require('jsonwebtoken');
const ObjectID = require('mongodb').ObjectID;


exports.createUser = function (req, res) {

    DBService.findOne({$or: [{username: req.body.username}, {email: req.body.email}]}, DBNAME, 'users').then(function (userObject){
        if (userObject) {
            if (userObject.email === req.body.email) {
                return res.status(500).send({
                    success: false,
                    message: 'Email already present. Please enter different username'
                });
            } else if (userObject.username === req.body.username) {
                return res.status(500).send({
                    success: false,
                    message: 'Username already present. Please enter different username'
                });
            }
        } else {

            let userInfo = {
                username: req.body.username,
                password: req.body.password,
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                email: req.body.email,
                phone: req.body.phone,
                role: USER_ROLE,
                credits: 10
            };

            DBService.insertOne(userInfo, DBNAME).then(function () {
                console.log('User added Successfully');
                res.status(200).json({
                    success: true,
                    message: `User ${userInfo.username} registered.`
                });
            }).catch(function (error) {
                console.log('Unable to add user', error);
                res.status(400).json({
                    success:false,
                    message: error.message
                })
            })
        }
    });
};

exports.authenticateUser = function (req, res) {
    DBService.findOne({username: req.body.username}, DBNAME, 'users').then(function (userObject) {
        if (userObject) {
            if (userObject.password === req.body.password) {
                let token = jwt.sign({"username": userObject.username, "password": userObject.password}, SECRET, {
                    expiresIn: "1d"
                });
                res.status(200).send({
                    success: true,
                    message: "User Authenticated",
                    token: token
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