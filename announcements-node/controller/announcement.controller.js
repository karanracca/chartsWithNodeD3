const announcementService = require('../service/announcement.service');
const d3nBar = require('d3node-barchart');
const d3nPie = require('d3node-piechart');
const d3nLine = require('d3node-linechart');
const d3 = require('d3-node')().d3;
const parseTime = d3.timeParse('%d-%b-%y');

//Code to  create bar chart
exports.createBarChart = async function (req, res) {
    if (req.file && req.body.barChartKeys) {

        try {
            let chartData = await announcementService.createBarChart(req.file, JSON.parse(req.body.barChartKeys));

            res.status(200).send({
                success: true,
                payload: chartData,
                message: "Bar Chart created",
            })
        } catch (error) {
            res.status(500).send({
                success: false,
                message: "Something went wrong",
            })
        }

    } else {
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
        })
    }
};

//code to create pie chart
exports.createPieChart = async function (req, res) {
    console.log("xyz");
    if (req.file && req.body.pieChartKeys) {
        let chartData = await announcementService.createPieChart(req.file, JSON.parse(req.body.pieChartKeys));
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

//code to create line chart
exports.createLineChart = async function (req, res) {
    if (req.file && req.body.lineChartKeys) {

        try{
            let chartData = await announcementService.createLineChart(req.file, JSON.parse(req.body.lineChartKeys));
            res.status(200).send({
                success: true,
                payload: chartData,
                message: "Chart created",
            })

        } catch(error) {
            res.status(500).send({
                success: false,
                message: "Something went wrong",
            })
        }
    }else {
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
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

//code to save the generated charts
exports.saveGeneratedChart = async function (req, res) {
    if (req.body.fileName && req.body.chart) {
        try {
            let result = await announcementService.saveChart(req.body, req.header('x-access-token'));
            if (result === 1) {
                res.status(200).json({
                    success: true,
                    message: "Chart saved successfully"
                })
            } else {
                throw new Error();
            }
        } catch (error) {
            res.status(400).send({
                success: false,
                message: "Something went wrong",
            })
        }
    }
    else {
        res.status(400).send({
            success: false,
            message: "File name missing",
        })
    }
};

//code to get the charts from the history
exports.getCharts = async function (req, res) {
    try {

        let allCharts = await announcementService.getCharts(req.header('x-access-token'));

        res.status(200).json({
            success: true,
            payload: allCharts,
            message: "All user charts"
        })

    } catch (error) {
        res.status(400).send({
            success: false,
            message: "Data not found",
        })
    }

};

