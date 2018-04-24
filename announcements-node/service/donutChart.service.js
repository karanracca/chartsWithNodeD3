const csv = require('csv');
const d3 = require('d3-node')().d3;
const output = require('d3node-output');
const {createFile} = require('./outputService');
const d3nDonut = require('../util/d3Donut');

<<<<<<< HEAD

exports.createDonutChart = function (file, keys) {
=======
//code to create a donut chart
exports.createDonutChart = function (file,keys) {
>>>>>>> f9604679fdf8ae06219ff37dbd9af1d3e4908882

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
                createFile('./chartsOutput/DonutChart', d3nDonut({data:d3parsedData})).then((htmlFile) => {
                    resolve(htmlFile);
                }).catch(error => {
                    console.log(error);
                    reject(error);
                });
            });
        });
    });
};