const mailer = require('../shared/mailer.service');
const DBService = require('../shared/db.service');
const common = require('../service/common.service');
const ObjectID = require('mongodb').ObjectID;
const {DBNAME, CHARTS_COLLECTION, USER_COLLECTION} = require('../shared/app-constants');

<<<<<<< HEAD
exports.createAnnouncement = async function createAnnouncement(content, receivers, token) {
=======

//function to create bar chart
exports.createBarChart = function (file, keys) {
    return new Promise((resolve, reject) => {
        //Parse Csv File
        csv.parse(file.buffer, function (err, data) {
            if (err) throw err;

            csv.stringify(data, function (err, stringData) {
                //console.log(stringData);
                let d3parsedData = d3.csvParse(stringData, function (parsedData) {
                    return {
                        key: parsedData[keys.xaxis],
                        value: parsedData[keys.yaxis]
                    };
                });

                let timestamp = Date.now();
                //Math.floor((Math.random() * 1000) + 1);
                createFile(`./chartsOutput/barChart${timestamp}`, d3nBar({data: d3parsedData})).then((chart) => {
                    resolve({chart, fileName : `barChart${timestamp}`});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};

//function to create pie chart
exports.createPieChart = function (file,keys) {
    return new Promise((resolve, reject) =>{

        csv.parse(file.buffer, function(err, data){
            if (err) throw err;
            csv.stringify(data, function(err, stringData) {
                console.log(stringData);
                let d3parsedData = d3.csvParse(stringData, function (parsedData) {
                    return {
                        label: parsedData[keys.xaxis],
                        value: parsedData[keys.yaxis]
                    };
                });
                let timestamp = Date.now();
                createFile(`./chartsOutput/pieChart${timestamp}`, d3nPie({data:d3parsedData})).then((chart) => {
                    resolve({chart, fileName : `pieChart${timestamp}`});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};

//function to create line chart
exports.createLineChart = function (file, keys) {

    return new Promise((resolve, reject) => {
        //Parse Csv File
        csv.parse(file.buffer, function (err, data) {
            if (err) throw err;

            csv.stringify(data, function (err, stringData) {
                console.log(stringData);
                let d3parsedData = d3.tsvParse(stringData, function (parsedData) {
                    //console.log(parsedData);
                    return {
                        key: parseTime(parsedData[keys.xaxis]),
                        value: parsedData[keys.yaxis]
                    };
                });
                let timestamp = Date.now();
                createFile(`./chartsOutput/lineChart${timestamp}`, d3nLine({data: d3parsedData})).then((chart) => {
                    resolve({chart, fileName : `lineChart${timestamp}`});
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};

//function to save the chart
exports.saveChart = async function (chartData, token) {
>>>>>>> f9604679fdf8ae06219ff37dbd9af1d3e4908882
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

<<<<<<< HEAD
exports.reduceCredits = async function (token) {
=======
//function to get the chart from it's history
exports.getCharts = async function (token) {
>>>>>>> f9604679fdf8ae06219ff37dbd9af1d3e4908882
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