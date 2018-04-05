var express = require('express');
const jwt = require('jsonwebtoken');
const {SECRET, DBNAME} = require('../shared/app-constants');
var router = express.Router();
const userController = require('../controller/user.controller');
const DBService = require('../service/db.service');

/*/!* GET users listing. *!/
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});*/

router.post('/authenticate', userController.authenticateUser);

router.post('/createUser', userController.createUser);

//Function to validate token
router.use(function (req, res, next) {

    // check header or url parameters or post parameters for token
    const token = req.body.token || req.query.token || req.headers['x-access-token'];

    if (token) {
        // verifies secret and checks exp
        jwt.verify(token, SECRET, function(err, decoded) {
            if (err) {
                return res.status(400).json({status:400, success: false, message: 'Failed to authenticate token.' });
            } else {
                // if everything is good, save to request for use in other routes
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(403).send({
            status: 403,
            success: false,
            message: 'No token provided.'
        });
    }
});

router.delete('/deleteUser/:id', userController.deleteUser);



module.exports = router;