const csv = require('csv');
const d3 = require('d3-node')().d3;
const output = require('d3node-output');
const d3nBar = require('d3node-barchart');
const d3nPie = require('d3node-piechart');
const d3nLine= require('d3node-linechart');
const {createFile} = require('./output.service');
const parseTime = d3.timeParse('%d-%b-%y');
const commonService = require('./common.service');
const DBService = require('../shared/db.service');
const {DBNAME, CHARTS_COLLECTION, USER_COLLECTION} = require('../shared/app-constants');


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
                createFile('./chartsOutput/pieChart', d3nPie({data:d3parsedData})).then((htmlFile) => {
                    resolve(htmlFile);
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
                createFile('./chartsOutput/lineChart', d3nLine({data: d3parsedData})).then((htmlFile) => {
                    resolve(htmlFile);
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
    try {
        let userInfo = await commonService.decodeToken(token);

        let chart = {
            username: userInfo.user.username,
            fileName: chartData.fileName,
            chartName: chartData.chartName,
            chart: chartData.chart
        };
        let result = await DBService.insertOne(chart, DBNAME, CHARTS_COLLECTION);
        return result;

    } catch (error) {
        return error;
    }
};

//function to get the chart from it's history
exports.getCharts = async function (token) {
    try {
        let userInfo = await commonService.decodeToken(token);

        let result = await DBService.find({username:userInfo.user.username}, DBNAME, CHARTS_COLLECTION);

        if (result.length > 0) {
            return result;
        } else {
            throw new Error("No records in database");
        }
    } catch (error) {
        return error;
    }
};

// exports.createdonutChart = function (file, keys) {
//     return new Promise((resolve, reject) => {
//
//     }
// }
