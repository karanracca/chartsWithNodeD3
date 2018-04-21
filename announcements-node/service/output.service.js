const fs = require('fs');
const svg2png = require('svg2png');

exports.createFile = function (dest, d3n) {

    return new Promise((resolve, reject) => {
        /*fs.writeFile(dest+'.html', d3n.html(), function () {
            console.log('>> Exported "'+ dest +'.html", open in a web browser');
            fs.readFile(dest+'.html', 'utf8', (err, data) => {
                if (err) reject(err);
                resolve(data);
            });
        });*/

        //let svgBuffer = d3n.createSVG().append('g');
        /*let svg = d3n.chartHTML();
        console.log("SVG", svg);
        resolve(svg);*/

        var svgBuffer = new Buffer(d3n.svgString(), 'utf-8');
        svg2png(svgBuffer)
            .then(buffer => fs.writeFile(dest+'.png', buffer))
            .catch(e => console.error('ERR:', e))
            .then(err => {
                console.log('>> Exported: "'+dest+'.png"');
                fs.readFile(dest+'.png', {encoding: 'base64'}, (err, data) => {
                    if (err) reject(err);
                    resolve(data);
                });
            });



    });



};
