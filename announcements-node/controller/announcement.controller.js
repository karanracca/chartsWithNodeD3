const {USER_ROLE, DBNAME, SECRET, USER_COLLECTION} = require('../shared/app-constants');
const announceService = require('../service/announcement.service');

<<<<<<< HEAD
exports.createAnnouncement = async function (req, res) {
    if (req.body.editorContent && req.body.receivers) {
        //console.log(req.body.editorContent);
        let result = await announceService.createAnnouncement(req.body.editorContent, req.body.receivers, req.header('x-access-token'));

        if (result) {
            if (result.rejected.length === 0) {
                res.status(200).send({
=======
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
        try {
            let chartData = await announcementService.createPieChart(req.file, JSON.parse(req.body.pieChartKeys));
            res.status(200).send({
                success: true,
                payload: chartData,
                message: "Pie Chart created",
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
>>>>>>> f9604679fdf8ae06219ff37dbd9af1d3e4908882
                    success: true,
                    message: "Announcement successfully created",
                })
            } else if (result.rejected.length > 0){
                res.status(400).send({
                    success: false,
                    message: "Could not create announcement for some receivers",
                })
            }
        }
<<<<<<< HEAD
    } else {
=======
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
>>>>>>> f9604679fdf8ae06219ff37dbd9af1d3e4908882
        res.status(400).send({
            success: false,
            message: "Not enough data provided",
        })
    }
};