const fs = require('fs');
const csv = require('csv');

const d3nBar = require('d3node-barchart');
const d3nPie = require('d3node-piechart');
const d3 = require('d3-node')().d3;
const output = require('d3node-output');

let dataTest = [['<5', '5-13', '14-17', '18-24'],[2704659, 4499890, 2159981, 3853788]];

exports.createNew = function (req, res) {
    console.log("File", req.file);
    csv.parse(req.file.buffer, function(err, data){
        if (err) throw err;
        csv.stringify(data, function(err, data1){
            console.log(data1);
            let test = d3.csvParse(data1, function(d) {
                return {
                    label:d.label,
                    value:d.value
                };
            });
            console.log(test);
            output('./output', d3nPie({ data: test }));
        });

    });
};