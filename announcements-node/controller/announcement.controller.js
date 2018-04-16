const fs = require('fs');
const csv = require('csv');
const announcementService = require('../service/announcement.service');

const d3nBar = require('d3node-barchart');
const d3nPie = require('d3node-piechart');
const d3nLine = require('d3node-linechart');
const d3 = require('d3-node')().d3;
const parseTime = d3.timeParse('%d-%b-%y');


exports.createPieChart = function (req, res) {
    console.log("File", req.file);
    csv.parse(req.file.buffer, function(err, data){
        if (err) throw err;
        csv.stringify(data, function(err, data1){
            console.log(data1);
            let test = d3.csvParse(data1, function(d) {
                return {
                    label:d.Country,
                    value:d['Units Sold']
                };
            });
            console.log(test);
            output('./output', d3nPie({ data: test }));
        });

    });
};

exports.createBarChart = async function (req, res) {
    if (req.file && req.body.barChartKeys) {
        let htmlFile = await announcementService.createBarChart(req.file, JSON.parse(req.body.barChartKeys));
        res.status(200).send({
            success: true,
            payload: htmlFile,
            message: "Chart created",
        })

    } else {
        res.status(400).send({
            success: false,
            message: "Incorrect data provided",
        })
    }

    /*console.log("Body inside");
    console.log("Body", req.body);
    console.log("File", req.file);
    csv.parse(req.file.buffer, function(err, data){
        if (err) throw err;
        csv.stringify(data, function(err, data1){
            console.log(data1);
            let test = d3.csvParse(data1, function(d) {
                return {
                    key:d.Country,
                    value:d['Units Sold']
                };
            });
            console.log(test);
            output('./output', d3nBar({ data: test }));
        });
    });*/
};


exports.createLineChart = async function (req, res) {
    if(req.file && req.body.lineChartKeys) {
        let htmlFile = await announcementService.createLineChart(req.file , JSON.parse(req.body.lineChartKeys));
        res.status(200).send({
            success: true,
            payload: htmlFile,
            message: "Chart created",
        })

    } else {
        res.status(400).send({
            success: false,
            message: "Incorrect data provided",
        })
    }
};


// exports.createLineChart = function (req, res) {
//     console.log("File", req.file);
//     csv.parse(req.file.buffer, function(err, data){
//         if (err) throw err;
//         csv.stringify(data, function(err, data1){
//             console.log(data1);
//             let test = d3.tsvParse(data1, function(d) {
//                 return {
//                     key: parseTime(d.date),
//                     value: +d.close
//                 };
//             });
//             console.log(test);
//             output('./output', d3nLine({ data: test }));
//         });
//     });
// };